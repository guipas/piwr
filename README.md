
### Telepi

A small application that serves as a remote control for a raspbery pie. You can configure buttons by modifying the `config.ts` file.

<div style="text-align:center;padding: 20px;">
![alt text](https://github.com/guipas/telepi/blob/master/telepi.png?raw=true)
</div>

- Neumorphic styles
- Built on NextJS
- Add as many buttons as you wish
- Run it with the `docker-compose` file included

#### Install

1. Clone this repo `git clone git@github.com:guipas/telepi.git`
2. Modify the `config.ts` file to suit you needs
  - Each button can have a `healthcheck`, ie a function that will be run in the backend, and depending on the result the button LED will change color and/or display a particular message
  - Each button can have an action, ie a function that will run in the backend when clicking on the button.
3. Launch it with docker compose, `docker-compose up -d`

#### Inspirations

- [https://neumorphism.io/#dedede](https://neumorphism.io/#dedede)  
- [https://css-tricks.com/neumorphism-and-css/](https://css-tricks.com/neumorphism-and-css/)