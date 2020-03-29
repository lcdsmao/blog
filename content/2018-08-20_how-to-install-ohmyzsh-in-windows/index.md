+++
title = "How to install oh-my-zsh in Windows"
date = 2018-08-20
+++

![image](1.png)

1.  Download [cygwin installer](https://www.cygwin.com/) and execute:`./setup-x86_64.exe -q -P git,vim,curl,wget,zsh,chere`

2. Open cygwin and install [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh):
`git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh  
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc`

3. Make zsh as the default shell. Edit `~/.bashrc` and add the following line to the top:
`exec zsh`

4. (Optional) Add cygwin to right-click context menu. Run cygwin as administrator and execute:
`chere -i -t mintty -s bash`

5. (Optional) Use cygwin as integrated terminal in IDE (IDEA, VS Code, etc.)

Create a bat file named `Cygwin-integrated.bat` under `C:\cygwin64` and add the following code:
`@echo off``set CHERE_INVOKING=1``C:\cygwin64\bin\bash.exe --login -i`

Make it executable
`chmod +x Cygwin-integrated.bat`

Use cygwin in VS Code (other IDEs are similar). Edit user settings and modify/add:
"terminal.integrated.shell.windows": "C:\\cygwin64\\Cygwin-integrated.bat"`
