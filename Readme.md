# 🎉 **NDC14 App - A Notice Board for Group-14** 🎉

Welcome to the **NDC14 App** — the ultimate notice board for Group-14 of Notre Dame College Dhaka! 🚀 Whether you're looking to catch up on the latest announcements or keep track of important events, this app has got you covered. 

Tired of chasing down notices or missing out on important updates? Fret no more! The **NDC14 App** brings everything to your fingertips in a sleek, easy-to-use interface. And the best part? It's as fast as your Wi-Fi on a good day (we've all been there, right? 😅). 

So, grab your virtual seat, explore the notices, and let this app make your academic life a whole lot smoother! 🧑‍🎓📚

## **Table of Contents** 📚

1. [Introduction](#introduction-✨)
2. [Project Philosophy](#project-philosophy-🧠)
3. [Folder Structure Breakdown](#folder-structure-breakdown-📁)
4. [Backend Overview](#backend-overview-💻)
5. [Frontend Overview](#frontend-overview-🎨)
6. [Technical Stack](#technical-stack-🔧)
7. [Features](#features-🎡)
8. [Getting Started](#getting-started-🚀)
9. [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq-❓)
10. [Credits](#credits-👑)

---

## **Introduction** ✨

Welcome to the **NDC14 App** — the future of notice management at Notre Dame College Dhaka! 🎓 Designed to streamline the way notices are handled, this full-stack web application is brought to life with love, caffeine, and a bit of genius by **Tahcin Ul Karim (Mycin)**. Yes, that’s me — and no, I’m not a wizard, but I did manage to make this app feel magical. ✨

The **NDC14 App** is a perfect blend of cutting-edge technology, smooth design, and functionality that just works — like your favorite pair of socks. Whether you’re a student hunting for the latest updates, an admin posting notices, or a developer who’s secretly trying to steal some cool ideas for your own project (we don’t judge!), this app has something for everyone.

It's **fast**, **secure**, and **responsive**, so whether you're on a desktop, tablet, or mobile device, it’ll feel like the app was made just for you. In short: it's the app you never knew you needed, but now you can’t live without. 😎

---

## **Project Philosophy** 🧠

The philosophy behind **NDC14 App** is as simple as it is powerful, like a solid cup of coffee on a Monday morning. ☕ Here's the vision we’ve poured our hearts (and many hours) into:

1. **Efficiency** 🚀: We believe in the power of speed! Our goal is to make sure that the app loads faster than your Wi-Fi speed test results (and that's saying something). With intuitive navigation, we aim to give users the experience of gliding through the app like it's butter on a hot pancake. No delays, no waiting — just pure awesomeness!

2. **Scalability** 📈: Think of this app like your favorite pair of stretchy pants — it’s designed to grow! Whether you're adding new features or handling more users than a popular TikTok star, this app adapts effortlessly. As user demand grows, our app will stretch to accommodate it, without any awkward squeezing. 🍕

3. **Aesthetics** 🎨: You’ve heard the saying “Don’t judge a book by its cover,” right? Well, we believe that in the world of web apps, the cover (aka design) *does* matter. We’ve carefully crafted a design that not only looks sleek but also feels at home with the Notre Dame College theme. It’s like wearing your best outfit to class — but with a touch of elegance that says, "I’ve got my life together." 😎

4. **Accessibility** 🌍: We’re not just about making the app work for you — we want it to work for *everyone*! Whether you're a tech wizard or someone who can barely turn on a computer, the NDC14 App ensures that it’s easy to use for all, on any device. Think of it as the universal remote for the digital world — it just works. ✨

This project is a testament to the power of open-source collaboration and modern web development practices.

---

## Project Structure 📁

The project is divided into two main sections: the **Backend** and the **Frontend**. The structure ensures that each section is well-organized, making it easy to develop, test, and deploy.

---

## **Backend Overview** 💻

The backend handles all data operations and provides a robust API for the frontend. It's built using **Go** (Golang), **Gin**, **JWT**, **Gorm** and **PostgreSQL**

### **Backend Folder Structure**:

```plaintext
📁NDC14-App
    └── 📁backend
        └── 📁cmd
            └── main.go
        └── 📁config
            └── connectDB.go
            └── loadEnv.go
            └── syncDB.go
        └── 📁controllers
            └── contact.controller.go
            └── notice.controller.go
            └── user.controller.go
        └── Dockerfile
        └── go.mod
        └── go.sum
        └── 📁libs
            └── algorithms.go
            └── logger.go
            └── testRecorder.go
            └── timestamp.go
        └── LICENSE
        └── Makefile
        └── 📁middlewares
            └── auth.middleware.go
            └── cors.middleware.go
        └── 📁models
            └── attachment.model.go
            └── contact.model.go
            └── notice.model.go
            └── user.model.go
        └── README.md
        └── 📁routes
            └── contact.route.go
            └── notice.route.go
            └── user.route.go
        └── 📁tests
            └── algorithm_test.go
            └── contactapi_test.go
            └── noticeapi_test.go
            └── userapi_test.go
```

### Key Components: 🚀

1. **cmd**: The heart of the app! This is where the magic begins. It contains the main entry point (typically `main.go`), where the server is initialized, configurations are loaded, and routes are set up. Think of it as the starting line of a race! 🏁

2. **config**: This folder contains all the secret sauce—environment variables, database configurations, and settings that power the app. If the app were a car, this would be the engine. 🏎️

3. **controllers**: The brain of the application! Controllers handle the business logic for various models and interact with the database. These are the workers in the background making sure everything runs smoothly. ⚙️

4. **models**: The blueprints! Here you define your database schemas and data structures. Models are responsible for shaping and organizing your data. Without them, the database would be just a chaotic mess! 🏗️

5. **routes**: The map! Routes direct incoming HTTP requests to the appropriate controller. Without them, the app would be lost, wandering around in the digital wilderness. 🌍

6. **middlewares**: The bouncers of the app! Middlewares intercept and process requests before they reach the controller. They ensure that the request is valid, authenticated, and prepared for the controller. Think of them as the security check at the door of an exclusive party. 🔒

7. **libs**: Your toolbox! This folder contains utility functions and custom libraries that the app uses. Need a helping hand? You’ll find it here. These libraries make sure you don’t reinvent the wheel! 🔧

8. **tests**: The safety net! Unit and integration tests ensure that the app behaves as expected. After all, even the best magicians need to practice their tricks to make sure they don’t fail at the big show. 🎩✨

## Frontend Overview 🎨
The frontend is built using **SvelteKit**, with Tailwind CSS for responsive and customizable styling. It's designed to provide a smooth and interactive user experience. 

### Frontend Folder Structure:
```plaintext
📁frontend
    └── bun.lockb
    └── Dockerfile
    └── package-lock.json
    └── package.json
    └── README.md
    └── 📁src
        └── app.css
        └── app.d.ts
        └── app.html
        └── 📁lib
            └── 📁Components
                └── 📁Contact
                    └── Contact.svelte
                    └── CurrentAdmins.svelte
                └── 📁Layouts
                    └── Footer.svelte
                    └── Navbar.svelte
                └── Upload.svelte
            └── index.ts
            └── 📁stores
                └── auth.ts
            └── 📁Utils
                └── Delete.ts
                └── Notify.ts
                └── Store.ts
                └── Token.ts
        └── 📁routes
            └── +error.svelte
            └── +layout.svelte
            └── +page.svelte
            └── 📁contact
                └── +page.svelte
            └── 📁dashboard
                └── +layout.svelte
                └── +page.svelte
                └── 📁account
                    └── +page.svelte
                    └── 📁edit
                        └── +page.svelte
                └── 📁messages
                    └── 📁[slug]
                        └── +page.svelte
                        └── +page.ts
                    └── +page.svelte
                └── 📁notices
                    └── 📁[slug]
                        └── +page.svelte
                        └── +page.ts
                    └── +page.svelte
                    └── 📁add
                        └── +page.svelte
                    └── 📁edit
                        └── 📁[slug]
                            └── +page.svelte
                            └── +page.ts
                        └── +page.svelte
                └── 📁users
                    └── 📁[slug]
                        └── +page.svelte
                        └── +page.ts
                    └── +page.svelte
                    └── 📁add
                        └── +page.svelte
                    └── 📁edit
                        └── +layout.svelte
                        └── +page.svelte
            └── 📁login
                └── +error.svelte
                └── +page.svelte
            └── 📁logout
                └── +page.svelte
    └── 📁static
        └── harrington.jpg
        └── ndc.png
    └── svelte.config.js
    └── tailwind.config.js
    └── tsconfig.json
    └── vite.config.ts
```

### Key Components: 🎨

1. **src**: The brain and backbone of the frontend! This folder holds the core logic of the app, including components, stores, utilities, and routes. If the frontend were a body, this would be the central nervous system. 🤖

2. **components**: The building blocks of your user interface! These are the reusable, customizable UI elements like the contact form, buttons, navigation layout, and any other feature that makes the app look awesome. Want a shiny new button? You’ll find it here. ⚒️

3. **layouts**: The skeleton that holds everything together! These are the common layouts shared across multiple pages, such as the footer, navbar, and page structure. They help maintain consistency across the app. Think of it as your favorite t-shirt—fits perfectly every time. 👕

4. **routes**: The roadmap of your app! Routes dictate which component gets displayed based on the user’s actions. Pages like login, dashboard, notices, and user profiles are all handled here. Without routes, your app would be as lost as someone without GPS. 🗺️

5. **static**: The gallery of your app! This folder holds all your static assets, such as images, icons, and other non-dynamic files. Whether it's a profile picture or your app logo, this is where they live. 🖼️

6. **tailwind.config.js**: The secret control panel! This file is where you configure Tailwind CSS. It’s your way of telling Tailwind how you want your app to look. Need some funky custom colors or spacing adjustments? This is your go-to. 🎛️

## Database Overview 🗃️

For the **NDC14 App**, we’ve chosen **PostgreSQL** as our primary database management system, hosted on **NeonDB**, to handle all our data storage and management needs. PostgreSQL is a powerful, open-source relational database that excels in performance, flexibility, and reliability. Here's why it's the perfect fit for our app:

- **Robust Data Integrity**: PostgreSQL ensures your data remains consistent and accurate through ACID (Atomicity, Consistency, Isolation, Durability) compliance, so every transaction is handled securely and efficiently. 🛡️
  
- **Scalability & Performance**: With PostgreSQL, we're able to scale as the app grows, supporting large amounts of data and users without compromising performance. NeonDB provides fully managed, cloud-native infrastructure, ensuring that your database is always fast, responsive, and ready for action. 🚀

- **Advanced Features**: PostgreSQL comes with a rich set of advanced features, including:
    - **Transactions**: Ensure that all operations within a transaction are completed successfully, or none at all. 🧮
    - **Foreign Keys**: Enforce referential integrity, meaning relationships between tables are consistently maintained. 🔗
    - **Triggers**: Automatically execute actions when specific events occur, streamlining workflows and enhancing data-driven automation. ⚡
  
- **Efficient Data Management**: With its mature indexing system and powerful query optimization, PostgreSQL ensures that data retrieval is quick and efficient, even with complex queries or large datasets. 📈

By choosing **NeonDB** to host our PostgreSQL database, we get a fully managed, serverless solution with automatic scaling, high availability, and seamless backups. It's like having a personal database assistant who never sleeps, ensuring the smooth running of the NDC14 App at all times. 🛠️

In short, **PostgreSQL on NeonDB** is the backbone that powers the app’s data, ensuring it runs securely, efficiently, and reliably—so you can focus on creating amazing experiences without worrying about data integrity or scaling challenges. 🎯

## Technical Stack 🔧
The NDC14 App is powered by the following technologies:
1. **Backend**: Go (Golang), Gin, JWT, Gorm, PostgreSQL 
2. **Frontend**: SvelteKit, Tailwind CSS
3. **Database**: PostgreSQL (NeonDB)
4. **Runtime**: Bun.js for ultra-fast performance, Go for performance
5. **Containerization**: Docker for consistent environments

## Features 🎡
The NDC14 App is packed with features designed to enhance user experience:
1. **Notice Management**: Easily post, update, and delete notices.
2. **User Authentication**: Secure login and registration.
3. **Responsive Design**: Optimized for all devices.
4. **Dark Mode**: Because everyone loves a good dark theme.
5. **Admin Dashboard**: Simplified controls for administrators.
6. **Cron Job**: Automated tasks scheduled with GitHub Actions. 


## Running Locally 🚀

The full web app is hosted on `https://ndc14.onrender.com/`, but if you're feeling adventurous (or just prefer running things locally like a tech wizard), you're in the right place! 😎 There are three methods to get this app running on your own server. So grab your cape, and let’s dive into it!

---

### Method 1: Running Manually (For the Brave Hearted) 🦸‍♂️🦸‍♀️

This method is for the ones who love to roll up their sleeves and get their hands dirty. 🧑‍💻 You’ll need **Go**, **Bun**, **Make**, and **PostgreSQL** installed for this method. 

#### Backend 💻

First, let’s start with the *Backend*. It’s built with **Go**, so get your Go groove on! 🎉

1. **Build and Run**: 
```bash
cd backend
go build
go run cmd/main.go
```
This will fire up the backend server on port 8080. If you’re feeling fancy, you can also use the **Makefile** to automate the process like a wizard. 🔮

```bash
cd backend
make build
make run
```

This will create a **binary file** in `/bin/server` and launch it. It's like cooking up a delicious server in the oven and serving it piping hot. 🍕

#### Frontend 🎨

Next, it’s time to make the *Frontend* come alive! Built with **SvelteKit**, the frontend is like the sprinkles on your cupcake. 🌈✨

1. **Build and Run**: 
```bash
cd frontend
bun install
bun run build
bun run start
```

    This will launch the frontend server on port 4000. Get ready for some slick, smooth UI magic! 🪄

#### Database 🗃️

Finally, let’s talk about the *Database*. We’re using **PostgreSQL**, which is like the vault that stores all your precious data. 🏰

- First, install PostgreSQL from the [official website](https://www.postgresql.org/download/).
- Create a user, set up a table, and connect the database to the backend.

And just like that, you're all set! 🎉

---

### Method 2: Docker Containers (For the Lazy Legends) 🛋️

Don’t feel like installing a bunch of software? No worries! Docker to the rescue! 🚢

#### Backend 🐋

1. **Build and Run** the Backend in Docker:
```bash
cd backend
docker build -t ndc-14-webapp .
docker run -p 8080:8080 -d ndc-14-webapp
```

    It’s like sending your backend to a spa day where everything is managed and taken care of for you. 🧖‍♂️

#### Frontend 🎮

2. **Build and Run** the Frontend in Docker:
```bash
cd frontend
docker build -t ndc-14-webapp-frontend .
docker run -p 4000:4000 -d ndc-14-webapp-frontend
```

    You’ll be up and running with the frontend faster than you can say “Docker-rrific!” 🚀

---

### Method 3: Using Docker Compose (For the Super Chill Folks 😎)

If you're reading this and thinking, “What’s all this Docker madness?”, don’t sweat it! I’ve got the perfect solution for you: **Docker Compose**! 🎶

This is the **ultimate shortcut** for running the app in one command. No need to install a bunch of tools—just let Docker Compose do all the heavy lifting. 💪

1. **Build and Run** with Docker Compose:
```bash
docker-compose build
docker-compose up
```

    Just two simple commands and *BAM*, everything is up and running! 🎉

---

### Now, what? 😎

Once you’re done, you can access the app like a true tech hero:

- **Backend**: `http://localhost:8080` 🔧
- **Frontend**: `http://localhost:4000` 🎨

### Access the Application 🌐

Ready to see the magic in action? Simply open your favorite web browser and head over to [**https://ndc14.onrender.com/**](https://ndc14.onrender.com/). 🎉

You'll be greeted by the sleek, fast, and user-friendly interface of the **NDC14 App**, where all the features come to life. Whether you're browsing notices, managing users, or exploring the dashboard, everything's just a click away!

So, go ahead—take it for a spin and enjoy the seamless experience we've crafted just for you. 😎💻

---

## **Frequently Asked Questions (FAQ)** ❓

### Q: Can I contribute to the project?
**A:** Absolutely! Fork the repo, make your changes, and submit a pull request. If you break something in the process, no worries—I’ll probably just blame it on my *"Mycin"* superpowers. 😎

### Q: Is this project open-source?
**A:** Yes, the repo is as open as my favorite book (which happens to be the README.md). Feel free to explore, modify, and use it. But if you find a bug, remember, I’m too busy coding my next masterpiece to fix it. 😉 

### Q: What is the purpose of this app?
**A:** To streamline notice management for Group-14 of Notre Dame College Dhaka. It’s designed to make life easier for students, faculty, and admins. Basically, it’s a digital bulletin board with a little bit of magic sprinkled in by yours truly, *Mycin*! ✨

### Q: Why should I use this app instead of the old-school notice board?
**A:** Why settle for a dusty board when you can have a sleek, responsive app that works on every device and sends notifications straight to your pocket? It’s like upgrading from a horse-drawn carriage to a Tesla. 🚗💨

### Q: Is there a mobile app version of this?
**A:** Yup! You can use the app on mobile via a web browser, or if you’re feeling extra fancy, we’ll be converting it to a full-fledged mobile app using Capacitor soon. Just sit tight, and we’ll take you places (literally, your pocket). 📱🚀

### Q: Can I customize the app for my own school or project?
**A:** Of course! This app is as customizable as a pizza. You can add, remove, or tweak features to your heart’s content. Want to add a 'Puppy of the Day' notice? Go for it. The app’s your playground! 🐶🍕

### Q: How do I deal with bugs?
**A:** Bugs? Oh, you mean *features* that need a little love. If you find any, feel free to open an issue or submit a fix. After all, every bug is just an opportunity to improve the app. Or in my case, a chance to show off my debugging skills. 🔍💻

---

## **Credits** 👑

This project wouldn’t have been possible without... well, mostly **me**:

- **Tahcin ul Karim (aka Mycin)**: The creator, lead developer, and occasional coffee enthusiast. I built this app from scratch, fueled by sheer brilliance (and a lot of caffeine). The app you see today? Pure *Mycin* magic. 
- **Open-Source Community**: You did some of the heavy lifting, but let’s be real—it’s my genius that made everything work. 😉
- **Coffee**: Not just a drink, but my partner in crime. Without it, *Mycin* would have been *Tahcin*, and this app would probably still be in the "idea" phase.

So yeah, big shout-out to me for making all of this happen. You’re welcome. 😉

---

### **Final Words** 🎉

Thank you for checking out the **NDC14 App**! If you’ve enjoyed the ride, found something useful, or are just impressed by my sheer brilliance (hello, it’s *Mycin* here), don’t forget to give the repo a star on GitHub. ⭐ Your support is the wind beneath our digital wings, and it helps keep the creative (and caffeine-powered) juices flowing!

Feel free to reach out if you’ve got questions, suggestions, or just want to share your love for this app. And remember, if it’s awesome—it’s because of me. If not, well... the *Open-Source Community* definitely helped. 😉

Thanks again, and happy coding! 🚀
