Web Application to log trips around the U.S.A

Refactored School Project with new technologies and new features such as:

- [x] **React** for the frontend
- [x] **Redux** for the state management
- [x] **Redux Toolkit Query** for the data fetching
- [x] **Material UI** for the UI
- [x] **React Hook Form** for the form handling


Live Demo:
[Demo](https://codesandbox.io/p/github/CarlosMartinezAGV/travelknightsrtq/main?file=%2Fsrc%2Fmain.tsx&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clrtiv8gv002r3b6eacwygh34%2522%252C%2522sizes%2522%253A%255B88.73536299765809%252C11.264637002341914%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clrtiv8gv002o3b6eemrjsrb9%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clrtiv8gv002q3b6elkpgrxsj%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clrtiv8gv002p3b6e0ro70ozs%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B40%252C60%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clrtiv8gv002o3b6eemrjsrb9%2522%253A%257B%2522id%2522%253A%2522clrtiv8gv002o3b6eemrjsrb9%2522%252C%2522activeTabId%2522%253A%2522clrtiwiv600023b6eriwhir5f%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252Fapp.css%2522%252C%2522id%2522%253A%2522clrtiv8i3003b3b6e1oe0pbi5%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522id%2522%253A%2522clrtiwiv600023b6eriwhir5f%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252Fmain.tsx%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%257D%252C%2522clrtiv8gv002p3b6e0ro70ozs%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clr9kemk700053b6kr4tl9vys%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clrtiv8gv002p3b6e0ro70ozs%2522%252C%2522activeTabId%2522%253A%2522clr9kemk700053b6kr4tl9vys%2522%257D%252C%2522clrtiv8gv002q3b6elkpgrxsj%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clr9kemk700033b6kh5c8j39x%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%257D%252C%257B%2522id%2522%253A%2522clr9kmeg1006q3b6kfhc64zgb%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clr9kmemd000se6gn6lqi9ngy%2522%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522server%2522%252C%2522id%2522%253A%2522clrfwkz4o008z3b6eao264ski%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%252C%2522id%2522%253A%2522clrtiv8gv002q3b6elkpgrxsj%2522%252C%2522activeTabId%2522%253A%2522clr9kemk700033b6kh5c8j39x%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A10%257D)


To run project:

1. Clone the repo
2. Run `npm install`
3. Run `npm start`
