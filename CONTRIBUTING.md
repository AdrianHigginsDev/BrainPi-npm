# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the CHANGELOG.md with details of changes to the package. This includes a detailed summary of
   the update you've implemented, or a fix you've made.
3. DO NOT attempt a pull request if the change you have made is something that specifically helps your own
   needs, and is not generic.
4. DO NOT attempt a pull request on a **brand new** implementation without a prior discussion &amp; approval
   from both the developers of this framework, and the community revolved around it.

## General Rules For Making Changes

1. As aforementioned, we are **not** looking for changes that cannot be implemented in a **generic** fashion, as it goes against the whole purpose of our framework.
2. Before attempting to implement a new feature, we need to dicuss it via the **issues** page, especially because my opinion is only worth 1%, but the other users of this framework are worth 99%.  Is your idea worth adding?  Ask the people.
3. Found a bug and patched it up?  Great.  But don't try to make a pull request without giving us details.  If I'm not sure what you were doing, I will reject it.
4. **PLEASE make sure you follow our CODING STANDARD**.  It doesn't help **anyone** if the codebase looks different in each file.

## Coding Standard

1. Use **multi-variable assignment** where applicable.  Pull Requests with code that has 3 var assignments in a row will be rejected.
2. Use **constants** and avoid **mutations** as much as possible.  Using var on a field that has no mutations will be rejected.  Unneccessary mutation will be rejected.  Our mission is to keep things readable and understandable.
3. **Good Variable Naming** is incredibly important.  A single **x** or **y** will result in a rejection.
4. **If/Else** with one line of code does not need **{ }** around it.  I won't reject because of that, but I would prefer it if you didn't.
5. Long **If/Else** statements that should be **switch** will result in a rejection.
6. **Poor Indenting** may or may not result in a rejection.  But it's highly likely.
7. **Use ES6 Conventions Where Possible**.  Arrow functions, map/reduce, etc.  It's so much easier to read.  I will not necissarily reject it, but I would prefer it.

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

This framework was built for you, the people, and we want to keep it that way.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members
* Remembering that we all come from different levels of experience.  **Please** do not pound someone for not knowing something.

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at adrianhigginsboston@gmail.com. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
