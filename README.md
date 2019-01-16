# BRAINPI

A Node JavaScript MVC Framework

BrainPI is a feature-rich MVC Framework, where our mission is **Clean, Easy, Precise**.  We cover all ends of the application life-cycle, from a Routing system with before/after **Middleware** classes, to quickly configuring a **Form Validation** blueprint inside of your **Model** file, or writing **Migrations** and **Cron Jobs** in just a few minutes.

We aim to tackle each obstacle you, the developer, may run into.

The BrainPI **App** class is used to load your datasources, such as a **MySQL** Database, or to access a **Local Filesystem**, without any effort.

The **SQL** Classes allow for very quick **SQL Building**, and access to our **Object Relational Mapping** tool.  This tool allows you to quickly define relationships in your **Model** Files, and make full query calls based on a one-line function, using the nature of the relationship.

The **File** &amp; **FileSystem** classes allow very dynamic and easy access to the file systems and storage your application may be using.

The **Conduct CLI (Command Line Interface)** allows incredibly fast **File Creation**, such as building up the scaffolding for your **Controllers, Models, Migrations, Cron Jobs** as well as actually running the **Migrations and Cron Jobs**.

The **Migrations** system is very easy to learn and write.  The Table class allows us to very easily define the specifications for our columns in a short &amp; easy manner.

The **Cron Jobs** system is also very simple to learn.  It uses a config() function to define the job's frequency, and a task() function, which runs during each iteration of the job.

The **Middleware** class allows us to write our own Middlewares to run either **before** or **after** our HTTP Request.  This means any middleware you write is accessible from both the **Routes** and the **Controller** files.  Both the **Route** and **Controller Base Class** allow us to access the middleware by name.

The **Form Validation** is easily defined in our Model file, and every time we handle a **POST Request**, we can call the **Model's Validate** method on our **Request** Object.  It couldn't be any simpler. (Recommended To Be Used In Middleware Rather Than Controller).

**These Are Just A Few Of The Great Features BrainPI Offers**


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

To get started, you'll need to have both Node & NPM Running on your machine.

To verify your installation of Node, open your command line and run:

```
$ node -v
```

If you get a response similar to:

```
v10.10.0
```

Then you're all set.

To verify your installation of NPM, open your command line and run:

```
$ npm -v
```

If you get a response similar to:

```
6.4.1
```

Then you're all set.

### Installing

A step by step series will help you install & get ready to start building your BrainPI Application.

We Recommend using our existing project template for proper results.

First, you need to navigate to the folder where your projects reside.

In here, run:

```
$ git clone https://github.com/AdrianHigginsDev/BrainPi.git
```

Afterwards, you'll need to run:

```
$ npm install
```



## Deployment

We will be releasing a guide on how to set up an Nginx System to deploy this application

## Built With

* [Node.js](https://nodejs.org/) - JavaScript Run Time Built On V8
* [NPM](https://www.npmjs.com/) - For Package Management

## Contributing


## Authors

* **Adrian Higgins** - *Creator Of BrainPI* - [AdrianHigginsDev](https://github.com/AdrianHigginsDev)

See also the list of [contributors](https://github.com/AdrianHigginsDev/brainpi/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Hat tip to all the authors who's projects helped make this what it is

**Special Awknowledgement To ExpressJS &amp; Pug**
