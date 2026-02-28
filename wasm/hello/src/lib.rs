use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Animator {
    phrases: Vec<String>,
    message: String,
    local_time: String,
    local_time_index: usize,
    state: AnimState,
    cursor: usize,
    typed_count: usize,
    typed_limit: usize,
    elapsed_ms: f64,
    since_state_ms: f64,
    since_caret_ms: f64,
    caret_on: bool,
    phase: f64,
    phase_speed: f64,
    typing_ms: f64,
    hold_ms: f64,
    pause_ms: f64,
    erase_ms: f64,
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub enum AnimState {
    Typing,
    Hold,
    Erase,
    Pause,
}

#[wasm_bindgen]
pub struct TickResult {
    text: String,
    caret_on: bool,
    phase: f64,
}

#[wasm_bindgen]
impl TickResult {
    #[wasm_bindgen(getter)]
    pub fn text(&self) -> String {
        self.text.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn caret_on(&self) -> bool {
        self.caret_on
    }

    #[wasm_bindgen(getter)]
    pub fn phase(&self) -> f64 {
        self.phase
    }
}

#[wasm_bindgen]
impl Animator {
    #[wasm_bindgen(constructor)]
    pub fn new(
        hour: u8,
        locale: String,
        time_zone: String,
        local_time: String,
        seed: u32,
    ) -> Animator {
        let greeting = localized_greeting(hour, &locale);

        let locale_label = friendly_locale(&locale);
        let tz_label = friendly_tz(&time_zone);

        let (phrases, local_time_index) = phrases(
            seed,
            greeting.as_str(),
            &locale_label,
            &tz_label,
            &local_time,
        );
        let message = phrases.get(0).cloned().unwrap_or_else(|| greeting.clone());
        let typed_limit = message.chars().count();

        let typing_ms = 42.0;
        let erase_ms = 28.0;
        let hold_ms = 1300.0;
        let pause_ms = 600.0;

        Animator {
            phrases,
            message,
            local_time,
            local_time_index,
            state: AnimState::Typing,
            cursor: 0,
            typed_count: 0,
            typed_limit,
            elapsed_ms: 0.0,
            since_state_ms: 0.0,
            since_caret_ms: 0.0,
            caret_on: true,
            phase: 0.0,
            phase_speed: 0.00065,
            typing_ms,
            hold_ms,
            pause_ms,
            erase_ms,
        }
    }

    #[wasm_bindgen]
    pub fn tick(&mut self, delta_ms: f64) -> TickResult {
        let delta = delta_ms.max(0.0).min(64.0);
        self.elapsed_ms += delta;
        self.since_state_ms += delta;
        self.since_caret_ms += delta;
        self.phase = (self.phase + delta * self.phase_speed) % 1.0;

        if self.since_caret_ms >= 520.0 {
            self.caret_on = !self.caret_on;
            self.since_caret_ms = 0.0;
        }

        match self.state {
            AnimState::Typing => {
                let step_count = (self.since_state_ms / self.typing_ms).floor() as usize;
                if step_count > 0 {
                    self.since_state_ms -= self.typing_ms * step_count as f64;
                    self.cursor = (self.cursor + step_count).min(self.typed_limit);
                    if self.cursor >= self.typed_limit {
                        self.state = AnimState::Hold;
                        self.since_state_ms = 0.0;
                    }
                }
            }
            AnimState::Hold => {
                if self.since_state_ms >= self.hold_ms {
                    self.state = AnimState::Erase;
                    self.since_state_ms = 0.0;
                }
            }
            AnimState::Erase => {
                let step_count = (self.since_state_ms / self.erase_ms).floor() as usize;
                if step_count > 0 {
                    self.since_state_ms -= self.erase_ms * step_count as f64;
                    self.cursor = self.cursor.saturating_sub(step_count);
                    if self.cursor == 0 {
                        self.state = AnimState::Pause;
                        self.since_state_ms = 0.0;
                    }
                }
            }
            AnimState::Pause => {
                if self.since_state_ms >= self.pause_ms {
                    self.advance_phrase();
                    self.state = AnimState::Typing;
                    self.since_state_ms = 0.0;
                }
            }
        }

        TickResult {
            text: self.slice_message(self.cursor),
            caret_on: self.caret_on,
            phase: self.phase,
        }
    }

    #[wasm_bindgen]
    pub fn full_message(&self) -> String {
        self.message.clone()
    }

    #[wasm_bindgen]
    pub fn set_local_time(&mut self, local_time: String) {
        if self.local_time == local_time {
            return;
        }
        self.local_time = local_time;
        if let Some(entry) = self.phrases.get_mut(self.local_time_index) {
            *entry = format!("Local time: {}.", self.local_time);
        }
        if self.typed_count == self.local_time_index {
            self.message = self.phrases[self.local_time_index].clone();
            self.typed_limit = self.message.chars().count();
            self.cursor = self.cursor.min(self.typed_limit);
        }
    }

    #[wasm_bindgen]
    pub fn tick_with_time(&mut self, delta_ms: f64, local_time: String) -> TickResult {
        self.set_local_time(local_time);
        self.tick(delta_ms)
    }

    fn advance_phrase(&mut self) {
        if self.phrases.is_empty() {
            return;
        }
        self.typed_count = (self.typed_count + 1) % self.phrases.len();
        self.message = self.phrases[self.typed_count].clone();
        self.typed_limit = self.message.chars().count();
        self.cursor = 0;
    }

    fn slice_message(&self, count: usize) -> String {
        self.message.chars().take(count).collect()
    }
}

fn phrases(
    seed: u32,
    greeting: &str,
    locale: &str,
    tz: &str,
    local_time: &str,
) -> (Vec<String>, usize) {
    let variants = [
        format!("{}.", greeting),
        format!("{} · {}.", greeting, locale),
        format!("Local time: {}.", local_time),
        format!("{} in {}.", greeting, tz),
        "Session ready.".to_string(),
    ];

    let mut order = vec![0, 1, 2, 3, 4];
    let mut state = seed.max(1);
    for i in (1..order.len()).rev() {
        state = state.wrapping_mul(1103515245).wrapping_add(12345);
        let j = (state as usize) % (i + 1);
        order.swap(i, j);
    }

    let local_time_index = order.iter().position(|value| *value == 2).unwrap_or(0);
    let phrases = order.into_iter().map(|idx| variants[idx].clone()).collect();
    (phrases, local_time_index)
}

fn friendly_locale(locale: &str) -> String {
    let mut parts = locale.split('-');
    let lang = parts.next().unwrap_or(locale);
    let region = parts.next();

    let label = match lang {
        "en" => "English",
        "es" => "Spanish",
        "fr" => "French",
        "de" => "German",
        "pt" => "Portuguese",
        "zh" => "Chinese",
        "ja" => "Japanese",
        "ko" => "Korean",
        "it" => "Italian",
        "nl" => "Dutch",
        "sv" => "Swedish",
        "no" => "Norwegian",
        "da" => "Danish",
        "fi" => "Finnish",
        "ru" => "Russian",
        "pl" => "Polish",
        "tr" => "Turkish",
        "ar" => "Arabic",
        "hi" => "Hindi",
        _ => "Local",
    };

    if let Some(region) = region {
        format!("{} ({})", label, region.to_uppercase())
    } else {
        label.to_string()
    }
}

fn friendly_tz(time_zone: &str) -> String {
    let mut parts = time_zone.split('/');
    let city = parts.nth(1).unwrap_or(time_zone);
    city.replace('_', " ")
}

fn localized_greeting(hour: u8, locale: &str) -> String {
    let lang = locale.split('-').next().unwrap_or(locale);
    let key = match hour {
        5..=10 => "morning",
        11..=16 => "afternoon",
        17..=21 => "evening",
        _ => "hello",
    };

    match (lang, key) {
        ("en", "morning") => "Good morning",
        ("en", "afternoon") => "Good afternoon",
        ("en", "evening") => "Good evening",
        ("en", "hello") => "Hello",
        ("es", "morning") => "Buenos dias",
        ("es", "afternoon") => "Buenas tardes",
        ("es", "evening") => "Buenas noches",
        ("es", "hello") => "Hola",
        ("fr", "morning") => "Bonjour",
        ("fr", "afternoon") => "Bon apres-midi",
        ("fr", "evening") => "Bonsoir",
        ("fr", "hello") => "Bonjour",
        ("de", "morning") => "Guten Morgen",
        ("de", "afternoon") => "Guten Tag",
        ("de", "evening") => "Guten Abend",
        ("de", "hello") => "Hallo",
        ("pt", "morning") => "Bom dia",
        ("pt", "afternoon") => "Boa tarde",
        ("pt", "evening") => "Boa noite",
        ("pt", "hello") => "Ola",
        ("it", "morning") => "Buongiorno",
        ("it", "afternoon") => "Buon pomeriggio",
        ("it", "evening") => "Buonasera",
        ("it", "hello") => "Ciao",
        ("nl", "morning") => "Goedemorgen",
        ("nl", "afternoon") => "Goedemiddag",
        ("nl", "evening") => "Goedenavond",
        ("nl", "hello") => "Hallo",
        ("sv", "morning") => "God morgon",
        ("sv", "afternoon") => "God eftermiddag",
        ("sv", "evening") => "God kvall",
        ("sv", "hello") => "Hej",
        ("no", "morning") => "God morgen",
        ("no", "afternoon") => "God ettermiddag",
        ("no", "evening") => "God kveld",
        ("no", "hello") => "Hei",
        ("da", "morning") => "God morgen",
        ("da", "afternoon") => "God eftermiddag",
        ("da", "evening") => "God aften",
        ("da", "hello") => "Hej",
        ("fi", "morning") => "Hyvaa huomenta",
        ("fi", "afternoon") => "Hyvaa iltapaivaa",
        ("fi", "evening") => "Hyvaa iltaa",
        ("fi", "hello") => "Hei",
        ("ru", "morning") => "Dobroye utro",
        ("ru", "afternoon") => "Dobryy den",
        ("ru", "evening") => "Dobryy vecher",
        ("ru", "hello") => "Privet",
        ("pl", "morning") => "Dzien dobry",
        ("pl", "afternoon") => "Dzien dobry",
        ("pl", "evening") => "Dobry wieczor",
        ("pl", "hello") => "Czesc",
        ("tr", "morning") => "Gunaydin",
        ("tr", "afternoon") => "Tunaydin",
        ("tr", "evening") => "Iyi aksamlar",
        ("tr", "hello") => "Merhaba",
        ("ar", "morning") => "Sabah al-khayr",
        ("ar", "afternoon") => "Masa al-khayr",
        ("ar", "evening") => "Masa al-khayr",
        ("ar", "hello") => "Marhaba",
        ("hi", "morning") => "Suprabhat",
        ("hi", "afternoon") => "Namaste",
        ("hi", "evening") => "Shubh sandhya",
        ("hi", "hello") => "Namaste",
        ("zh", "morning") => "Zao shang hao",
        ("zh", "afternoon") => "Xia wu hao",
        ("zh", "evening") => "Wan shang hao",
        ("zh", "hello") => "Ni hao",
        ("ja", "morning") => "Ohayo gozaimasu",
        ("ja", "afternoon") => "Konnichiwa",
        ("ja", "evening") => "Konbanwa",
        ("ja", "hello") => "Konnichiwa",
        ("ko", "morning") => "Annyeonghaseyo",
        ("ko", "afternoon") => "Annyeonghaseyo",
        ("ko", "evening") => "Annyeonghaseyo",
        ("ko", "hello") => "Annyeonghaseyo",
        _ => match key {
            "morning" => "Good morning",
            "afternoon" => "Good afternoon",
            "evening" => "Good evening",
            _ => "Hello",
        },
    }
    .to_string()
}
