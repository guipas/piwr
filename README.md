
### Telepi

A small application that serves as a remote control for a raspbery pie. You can configure buttons by modifying the `config.ts` file.

<p align="center">
  <img src="https://github.com/guipas/telepi/raw/main/telepi.png"/>
</p>

<p></p>

Features:
- Neumorphic styles
- Built on NextJS
- Add as many buttons as you wish
  - Each button can have a `healthcheck`, ie a function that will be run in the backend, and depending on the result the button LED will change color and/or display a particular message
  - Each button can have an `action`, ie a function that will run in the backend when clicking on the button.
- Run it with the `docker-compose` file included

#### Install

1. Clone this repo `git clone git@github.com:guipas/telepi.git`
2. Modify the `config.ts` file to suit you needs (see example below)
3. Launch it with docker compose, `docker-compose up -d`

#### Configure

You can easily add buttons to perform various action by modifying the `config.ts` file.
```ts
export const config: Config = {
  title: 'My Raspberry Pie',
  buttons: [
    {
      id: 'pi_status',
      labels: {
        // those labels will be display in the button depending on the healthcheck results
        success: 'On',
        error: 'Off',
        confirm: 'Reboot ?',
        pending: 'Rebooting',
      },
      healthCheck: true, // can be a boolean or function (see below), if it's a boolean, it will basically just check if the app is running
      action: (req: NextApiRequest, res: NextApiResponse) => {
        // you can acces the NodeJS API from there, this will be executed in the backend
        // when the user click on the button
        if (req.method === 'POST') {
          fs.writeFileSync(`/trigger`, 'b');
        }
      }
    },
    {
      id: 'external_hdd_status',
      labels: {
        success: 'HDD',
        error: 'HDD Disconnected',
        pending: 'Checking HDD...',
      },
      healthCheck: async () => {
        // if the function throws an error, the button on the frontend will turn red
        // if the function succeed, the button will turn green
        if (process.env.TELEPI_HDD_PATH) {
          // for this example, the healthcheck checks if a particular path is accessible in our pi
          // if not, then this function will throw an error, the button will turn red on the frontend
          await fs.promises.readdir(process.env.TELEPI_HDD_PATH, 'utf-8');
        } else {
          console.error(`Enable to check if the HDD is connnected. The env varible TELEPI_HDD_PATH is not set`);
        }
      }
    },
  ]
};
```

#### Inspirations

- [https://neumorphism.io/#dedede](https://neumorphism.io/#dedede)  
- [https://css-tricks.com/neumorphism-and-css/](https://css-tricks.com/neumorphism-and-css/)