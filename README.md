# Event-calendar-with-React
Admin can add, update and delete events, while other users can view events in the calendar.

This project is a simple implementation of `react-big-calendar` module.
It requires **Node.js**, **npm**, and **MongoDB database** to be installed in your computer. 

Assuming all of the above is already installed, after cloning this repository:
1. Open a terminal, run `npm install` in the root directory.
2. Then migrate to *views* directory, and run `npm install` here as well.
3. Then, in root directory, create a file named ***.env***
4. In this file, add an environmental variable `MONGODB_URI`.
5. `MONGODB_URI` should contain your **MongoDB database connection URL**.
    An example would be `MONGODB_URI = mongodb://mongodb0.example.com:27017`. 
6. Then in root directory run `nodemon index.js`.
7. If all goes well, the following output should be displayed in terminal: 
```
[nodemon] 2.0.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
Server started on port 8080
MongoDB Connected: backenddata-shard-00-02.vmmsm.mongodb.net
```
8. Then, leaving that terminal running, open another terminal and migrate to *views* directory.
9. In *views* directory,  run `npm start`.
10. A new tab will be opened in your browser, with ***http://localhost:3000*** as URL.
11. Click on the link shown in the website displayed to register as a new user.
12. To register as administrator, type **Admin** as username. Only one **Admin** can exist for this website. All other users have a username which is not **Admin**.

Normal users can view events in the calendar. *Day* or *Week* view will show timings for events.

Admin can click on a slot in the calendar, a pop-up will be opened to add an event name, and a new all-day event will be created.
In *Day* or *Week* view, a drag your mouse over a few slots to select a time slot. A pop-up will appear, and you can add a new event for that time slot. 
Click on any existing event, a pop-up to edit the name or delete the event will appear. 
All changes will be reflected in the database.

