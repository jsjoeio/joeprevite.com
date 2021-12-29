---
slug: "rust-lang-ecosystem"
date: "2020-06-15"
title: "Understanding the Rust Ecosystem"
description: "An overview of the Rust language ecosystem along with resources and articles to help you better understand it."
tagline: "A overview of the programming language"
published: true
tags: ["Rust"]
---

![Graph representing all the facets made up in a programming language ecosystem.](../assets/images/prog-lang-ecosystem.png)

Rust, a systems-programming language, which prides itself on being Stack Overflow’s “[most loved language for five years in row](https://insights.stackoverflow.com/survey/2020)” and GitHub’s [second fastest growing](https://octoverse.github.com/) (235% 2018-2019) has gained popularity both at companies like [Amazon, FB, Discord](https://www.businessinsider.com/what-is-rust-programming-language-amazon-facebook-discord-love-it-2020-6?r=US&IR=T) and externally within the programming community.

For part of my job, I have been focused on developing my own understanding of the space. I work within the DevTools pillar and focus primarily on programming languages. My main priority for H1 of 2020 has been Rust. The goal of this article is:

- To paint a high-level overview of the ecosystem

The article covers various aspects of the ecosystem including community, companies using the language, selling points, etc.

## Overview

One of the hardest parts of understanding a programming language is setting the boundaries for what you encapsulate as part of and not part of the ecosystem. I gathered input coworkers and mentors in order to set the criteria for this project. For our purposes, I choose to limit it to the following areas, which you’ll see below. For each section, you can expect:

- A brief description of how I defined the section
- Key highlights from the ecosystem for that area of the ecosystem

### Academic Research

Things that fall under this category might be research papers, academic presentations, and anything related. It was difficult to find much in this area, but here are a few highlights:

- [Memory-Safety Challenge Considered Solved? An Empirical Study with All Rust CVEs](https://arxiv.org/pdf/2003.03296.pdf)
- [What can the programming language Rust do for astrophysics?](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/B51B6DF72B7641F2352C05A502F3D881/S1743921316013168a.pdf/what_can_the_programming_language_rust_do_for_astrophysics.pdf)
- [RustBelt: Securing the Foundations of the RustProgramming Language](https://dl.acm.org/doi/pdf/10.1145/3158154)
- [Rust-Like Borrowing with 2nd-Class Values (Short Paper)](https://dl.acm.org/doi/pdf/10.1145/3136000.3136010)
- [Safe Systems Programming in Rust:The Promise and the Challenge](https://robbertkrebbers.nl/research/articles/safe_programming_rust.pdf)
- [Fearless Concurrency? Understanding Concurrent Programming Safety in Real-World Rust Software](https://arxiv.org/pdf/1902.01906.pdf)

As you can tell from skimming the headings, researchers are looking at Rust’s use cases, security, memory management, type-safety and concurrency. It’s unfortunate there isn’t an easy way to stay on top of academic research within Rust.

### Demographics

When you look at the programming language, how do you know who is using it? What industries do they work in? Fortunately, the [Rust Survey 2019 Results](https://blog.rust-lang.org/2020/04/17/Rust-survey-2019.html) provides insight related to demographics. Based on the results, here are the key highlights:

- Respondents' top five languages: English, Chinese, German, French and Japanese
- Top five industries using Rust: Backend Web Applications, Distributed Systems, Embedded Devices, IT and Network Programming
- Top three titles for Rust users: Programmer/Software Engineer, Systems Architect, Web Developer/Front End Developer

It’s unfortunate that we do not have more information related to demographics such as gender, ethnicity, race, etc. There was an attempt to gather some of this information in the [2016 survey](https://blog.rust-lang.org/2016/06/30/State-of-Rust-Survey-2016.html). Know that this section contains a small glimpse into the people of the Rust and is far from complete or representative of the ecosystem.

### Community

Community itself is a huge category. I tried my best to break it into subcategories for things that might fit here.

In general, think of this area as the various places where members of the community congregate (online and in-person), groups who write code, and foundations. These are a combination of chat platforms, but also places where updates are shared with the community. Here are some worth noting:

- Chat Platforms
  - Discord (35,597 members total)
    - [The Rust Programming Language](https://discord.com/invite/rust-lang) (25,135 members)
    - [Rust Programming Language Community Server](https://discord.com/invite/aVESxV8) (10,462 members)
  - [Rust lang Slack](https://rust-slack.herokuapp.com/) (3,046 people)
  - [Rust Team Zulip](https://rust-lang.zulipchat.com/login/) (655 people) (mainly focused on people who work on Rust itself)
- Conferences
  - [FOSDEM](https://fosdem.org/2020/)
  - [RustConf](https://rustconf.com/)
  - [Rusty Days](https://rusty-days.org/)
  - [RustFest Netherlands](https://netherlands.rustfest.eu/)
  - [Rust + GNOME Hackfest](https://wiki.gnome.org/Hackfests/Rust2020)
  - [Rust Latam](https://www.rustlatam.org/)
  - [RustLab](https://www.rustlab.it/)
  - [Oxidize](https://oxidizeconf.com/)
  - [List of 2020 events on the Rust lang blog](https://blog.rust-lang.org/2020/01/31/conf-lineup.html)
- Core contributors
  - [Governance](https://www.rust-lang.org/governance) - all the different core team members associated with each team
  - [GitHub Rustlang org members](https://github.com/orgs/rust-lang/people)
  - GitHub committers - over [2k people](https://github.com/rust-lang/rust/graphs/contributors) have contributed to [/rust](https://github.com/rust-lang/rust) repo
  - [Rust team alumni](https://www.rust-lang.org/governance/teams/alumni) - people who worked on a Rust team previously
- Forums
  - [Users forum](https://users.rust-lang.org/) (14.2k)
  - [Internals forum](https://internals.rust-lang.org/) (6.8k)
  - [r/rust -Reddit](https://www.reddit.com/r/rust/) (100k people)
- Meetups
  - Stats (meetups [with the topic “rust”](https://www.meetup.com/topics/rust/all/))
    - 73,706 members
    - 1,749 interested
    - 204 Meetups
    - 145 cities
    - 42 countries
  - Groups (not all listed, some highlights)
    - [Desert Rust (Phoenix, AZ)](https://www.meetup.com/Desert-Rustaceans/)
    - [Minneapolis Rust Meetup](https://www.meetup.com/Minneapolis-Rust-Meetup/)
    - [Rusty Bay Area Meetup](https://www.meetup.com/Rust-Bay-Area/)
    - [Rust Bangalore](https://www.meetup.com/RustBLR/)
    - [Rust Berlin](https://www.meetup.com/Rust-Berlin/)
    - [Rust in Blockchain](https://www.meetup.com/Rust-in-Blockchain-San-Francisco/)
    - [Rust Los Angeles](https://www.meetup.com/Rust-Los-Angeles/)
    - [Rust London User Group](https://www.meetup.com/Rust-London-User-Group/)
    - [Rust Dev in Mountain View Meetup](https://www.meetup.com/Rust-Dev-in-Mountain-View/)
    - [Rust Denver](https://www.meetup.com/Rust-Boulder-Denver/)
    - [Rust NYC](https://www.meetup.com/Rust-NYC/)
    - [Rust Nairobi](https://www.meetup.com/Rust-Nairobi/)
    - [Rust Paris](https://www.meetup.com/Rust-Paris/)
    - [San Diego Rust](https://www.meetup.com/San-Diego-Rust/)
    - [Seattle Rust Meetup](https://www.meetup.com/Seattle-Rust-Meetup/)
    - [Utah Rust](https://www.meetup.com/utah-rust/)
- Miscellaneous
  - [RFCs](https://github.com/rust-lang/rfcs) (2.9k stars) - where technical decisions are made in regards to Rust
  - [This Week in Rust](https://this-week-in-rust.org/) - weekly newsletter
- Programs
  - [Rust’s Reach](https://reach.rust-lang.org/) (currently on hold due to lack of funding and people) - “mentorship like program between participants from URGs and Rust team members”
  - [Rust Bridge](https://rustbridge.com/) (1 chapter) - “a workshop focused on getting underrepresented people with a background in another programming language to learn Rust and join the community.”

_\*These stats were taken on 5/19/2020_

As you can see, the community category extends itself across many platforms and mediums online. It’s easy to overwhelm oneself with all the places you can go to get involved. The beautiful part is that there is no shortage of finding ways to meet others within the community.

_\*For the data in the “Meetups > Stats” category, you’ll notice that it includes some meetups that are not specifically for Rust so take that number with a grain of salt._

### Companies

It would be impossible to list all the companies that use Rust. This is a sub-selection of notable companies (more well-known) that are using or investing in Rust, ideally along with articles where they share how they’re using it or helping the ecosystem:

- Amazon
  - AWS is sponsoring the Rust programming language - [AWS Open Source Blog](https://aws.amazon.com/blogs/opensource/aws-sponsorship-of-the-rust-project/) (October 2019)
  - “..._AWS staff open-sourced a virtualization technology named [Firecracker](https://firecracker-microvm.github.io/)_ _that was coded primarily in Rust_” - [zdnet.com article](https://www.zdnet.com/article/aws-to-sponsor-rust-project/) (October 2019)
  - “_As Rust starts to take up a larger chunk of Amazon's backend code, the company is making sure the project has the means to continue to evolve and fix security issues.” _-\_ \_[zdnet.com article](https://www.zdnet.com/article/aws-to-sponsor-rust-project/) (October 2019)
  - AWS sponsors RustConf - [AWS Open Source Blog](https://aws.amazon.com/blogs/opensource/rustconf-2018/) (2018 - 2020)
- Apple
  - [Rust for server-side Linux on Apple Cloud Traffic](https://www.phoronix.com/scan.php?page=news_item&px=Apple-From-C-To-Rust) (March 2020)
- Atlassian (makers of Jira)
  - [Use Rust in the backend for analyzing terabytes of source code](https://github.com/rust-lang/prev.rust-lang.org/pull/922)
- Cloudflare
  - [Cloudflare uses Rust in production for WebAssembly edge computing as well as a lot of foundational infrastructure](https://blog.cloudflare.com/tag/rust/) (2018-2019)
- Discord
  - [“Why Discord is switching from Go to Rust”](https://blog.discordapp.com/why-discord-is-switching-from-go-to-rust-a190bbca2b1f) - (February 2020) 11.9K claps
  - [“Using Rust to Scale Elixir for 11 Million Concurrent Users”](https://blog.discordapp.com/using-rust-to-scale-elixir-for-11-million-concurrent-users-c6f19fc029d3) - (May 2019) 6.4K claps
- Dropbox
  - Dropbox is highlighted on the [/production](https://www.rust-lang.org/production) page of the [rust-lang.org](https://www.rust-lang.org/) website - (currently - March 2020)
  - [Go-ing to Rust: Optimizing Storage at Dropbox](https://qconsf.com/sf2016/sf2016/presentation/going-rust-optimizing-storage-dropbox.html) - (November 2017)
  - Dropbox is mentioned on official [Rust lang blog](https://blog.rust-lang.org/2017/05/15/rust-at-two-years.html) - (May 2017)
  - [“The Epic Story of Dropbox's Exodus From the Amazon Cloud Empire”](https://www.wired.com/2016/03/epic-story-dropboxs-exodus-amazon-cloud-empire/) - (March 2016)
- Facebook
  - [Developers have named Rust their most-loved programming language five years in a row. Here's why developers at Facebook, Dropbox, and Amazon all adore it](https://www.businessinsider.com/what-is-rust-programming-language-amazon-facebook-discord-love-it-2020-6?r=US&IR=T) - (June 2020)
  - The Relay Team is experimenting with a [“rewrite of the Relay compiler in Rust”](https://github.com/facebook/relay/tree/master/compiler) (May 2020)
  - Mononoke, the new Mercurial backend, was written from scratch in Rust
- GitHub
  - [GitHub donating VMs for GitHub Actions](https://blog.rust-lang.org/inside-rust/2020/04/07/update-on-the-github-actions-evaluation.html) (April 2020)
- Google
  - Rust makes up increasingly large parts of Google's [Fuchsia operating system](https://fuchsia.dev/fuchsia-src)
  - [Chrome OS’s virtualization infrastructure](https://chromium.googlesource.com/chromiumos/platform/crosvm/) and several other components are in Rust
  - [Android uses Rust](https://android-review.googlesource.com/q/rust)
  - [Chromium is beginning to adopt Rust](https://chromium-review.googlesource.com/q/project:experimental/chromium/src+branch:refs/wip/rust-experimental-branch)
  - Google released an “unofficial” project called `[tarpc](https://github.com/google/tarpc)` “An RPC framework for Rust”
- Microsoft
  - Microsoft featured on [/sponsors](https://www.rust-lang.org/sponsors) page
  - [“Microsoft opens up Rust-inspired Project Verona programming language on GitHub”](https://www.zdnet.com/article/microsoft-opens-up-rust-inspired-project-verona-programming-language-on-github/) - (Jan 2020)
  - [“Microsoft looks to Rust language to beat memory vulnerabilities”](https://nakedsecurity.sophos.com/2019/12/04/microsoft-looks-to-rust-language-to-beat-memory-vulnerabilities/) - (Dec 2019)
  - [“Microsoft Exploring Rust as the Solution for Safe Software”](https://www.infoq.com/news/2019/11/microsoft-exploring-rust-safety/) - (Nov 2019)
  - [Azure Pipelines sponsoring Rust](https://www.theregister.co.uk/2019/10/15/aws_sponsoring_rust_microsoft_azure/) - (Oct 2019)
  - [Microsoft looking into Rust for security reasons](https://msrc-blog.microsoft.com/2019/07/16/a-proactive-approach-to-more-secure-code/). - (July 2019)
  - [“Microsoft eyes Mozilla’s Rust to obliterate C++ memory security flaws”](https://www.csoonline.com/article/3501029/microsoft-eyes-mozilla-s-rust-to-obliterate-c-memory-security-flaws.html) - (July 2019)
  - [Azure IoT Edge has been using Rust since at least 2018](https://twitter.com/maxgortman/status/1012011425353461760)
- Mozilla
  - Rust is used in Firefox through a project called [Oxidation](https://wiki.mozilla.org/Oxidation)
  - Mozilla is writing a browser written in Rust called [Servo](https://servo.org/)
  - [“Rust 2018 is here… but what is it?”](https://hacks.mozilla.org/2018/12/rust-2018-is-here/) - (Dec 2018)
  - [“Mozilla binds Firefox's fate to the Rust language”](https://www.infoworld.com/article/3165424/mozilla-binds-firefoxs-fate-to-the-rust-language.html) - (Feb 2017)
  - [“Project for porting C to Rust gains Mozilla's backing”](https://www.infoworld.com/article/3136934/project-for-porting-c-to-rust-gains-mozillas-backing.html) - (Oct 2016)
- npm
  - [Performance critical registry service architecture is Rust](https://github.com/rust-lang/prev.rust-lang.org/pull/634)
- Reddit
  - [Uses Rust for comment processing](https://www.reddit.com/r/rust/comments/7utj4t/reddit_is_hiring_a_senior_rust_engineer/)
- Twitter
  - [Build team has been using Rust in production for ~3 years and intend for it to make up a large portion of their codebase going forward](https://twitter.com/stuhood/status/978410393944047617)
- Yelp
  - Yelp is featured under the “Rust in production” section of [rust-lang.org](https://www.rust-lang.org/), they talk about how they use it in [this talk](https://www.youtube.com/watch?v=u6ZbF4apABk) - (Aug 2018)
- Honorable Mentions
  - There is a list of production users on the [rust-lang.org website](https://www.rust-lang.org/production/users)
  - [“A Snapshot of Rust's Popularity in July 2018”](https://www.jonathanturner.org/2018/07/snapshot-of-rust-popularity.html)
  - [Nike using Rust](https://github.com/Nike-Inc/aws-greengrass-core-sdk-rust)

### Language

Think core library, compiler, type system. Basically all the code that makes up the language and some of the tools that help with writing code in Rust.

- Books & References
  - [Asynchronous Programming In Rust Book](https://rust-lang.github.io/async-book/)
  - [Command Line Applications in Rust](https://rust-cli.github.io/book/index.html)
  - [The Rust Programming Language Book](https://doc.rust-lang.org/book/)
  - [The Cargo Book](https://doc.rust-lang.org/cargo/index.html) - info about the rust package manager
  - [The Rustonomicon Book](https://doc.rust-lang.org/nomicon/) - the dark arts of unsafe Rust
  - [The Rust Reference Book](https://doc.rust-lang.org/reference/index.html)
  - [Rust Compiler Error Index](https://doc.rust-lang.org/error-index.html) - book on all the rust compiler errors
  - [rustdoc Book](https://doc.rust-lang.org/rustdoc/index.html) - all about rustdoc and writing documentation in Rust
  - [std](https://doc.rust-lang.org/std/index.html) - standard library docs
- Code & DevTools
  - [Cargo](https://github.com/rust-lang/cargo) the package manager + build system
  - [Core language](https://github.com/rust-lang/rust)
  - [Rust-clippy](https://github.com/rust-lang/rust-clippy) - official linter
  - [Rustfmt](https://github.com/rust-lang/rustfmt) - official formatter
  - [rustc](https://github.com/rust-lang/rust/tree/master/src/rustc) - the Rust compiler (inside the core language)

### Language Frameworks

What would a programming language be without frameworks? Thankfully, the community resource [rust-web-framework-comparison](https://github.com/flosse/rust-web-framework-comparison) made this research easy. Here is a long list:

- Client frameworks
  - **actix-web** ([homepage](https://actix.rs/) /[ repository](https://github.com/actix/actix-web) /[ api docs](https://actix.github.io/actix-web/actix_web/client/index.html))
  - **reqwest** (- /[ repository](https://github.com/seanmonstar/reqwest) /[ documentation](https://docs.rs/reqwest))
  - **hyper** ([homepage](http://hyper.rs/) /[ repository](https://github.com/hyperium/hyper) /[ documentation](http://hyper.rs/hyper/hyper/))
  - **jsonrpc** (- /[ repository](https://github.com/apoelstra/rust-jsonrpc/) /[ documentation](https://www.wpsoftware.net/rustdoc/jsonrpc/))
- Frontend frameworks (WASM)
  - **stdweb** ( - /[ repository](https://github.com/koute/stdweb) /[ documentation](https://docs.rs/stdweb/) ) A standard library for the client-side Web
  - **yew** ([ homepage](https://yew.rs) /[ repository](https://github.com/yewstack/yew) /[ documentation](https://docs.rs/yew/) ) - A frontend framework inspired by Elm and React (based on stdweb)
  - **percy** ([ homepage](https://chinedufn.github.io/percy/) /[ repository](https://github.com/chinedufn/percy) / - ) - A modular toolkit for building isomorphic web apps
  - **seed** ([ homepage](http://seed-rs.org/) /[ repository](https://github.com/David-OConnor/seed) / - ) - A Rust framework for creating web apps
  - **draco** ( - /[ repository](https://github.com/utkarshkukreti/draco) /[ documentation](https://docs.rs/draco/) ) - A frontend framework inspired by Redux and Elm
  - **smithy** ([homepage](https://www.smithy.rs) - /[ repository](https://github.com/rbalicki2/smithy) / -[ documentation](https://docs.smithy.rs/smithy/) ) - A front-end framework
  - **squark** ( - /[ repository](https://github.com/rail44/squark) /[ documentation](https://docs.rs/squark) ) - Rust frontend framework, for web browser and more.
  - **willow** ([ homepage](http://sindrejohansen.no/willow/) - /[ repository](https://github.com/sindreij/willow) / - ) - A frontend framework inspired by Elm
  - **dodrio** ( - /[ repository](https://github.com/fitzgen/dodrio) /[ documentation](https://docs.rs/dodrio/) ) - A fast, bump-allocated virtual DOM library.
  - **dominator** ( - /[ repository](https://github.com/Pauan/rust-dominator) /[ documentation](https://docs.rs/dominator/) - Zero cost declarative DOM library using FRP signals for Rust!.
  - **mika** ([ homepage](https://limira-rs.gitlab.io/mika/) /[ repository](https://gitlab.com/limira-rs/mika) / - ) - A signal-based framework for building front-end app, it tries to help, but may cause annoyances.
- Server frameworks
  - **actix-web** ([homepage](https://actix.rs/) /[ repository](https://github.com/actix/actix-web) /[ documentation](https://actix.github.io/actix-web/actix_web/) /[ user guide](https://actix.rs/docs/))
  - **gotham** ([homepage](http://gotham.rs/) /[ repository](https://github.com/gotham-rs/gotham/) /[ documentation](https://docs.rs/gotham/) /[ examples](https://github.com/gotham-rs/gotham/tree/master/examples))
  - **iron** ([homepage](http://ironframework.io/) /[ repository](https://github.com/iron/iron/) /[ documentation](http://ironframework.io/doc/iron/))
  - **nickel** ([homepage](http://nickel-org.github.io/) /[ repository](https://github.com/nickel-org/nickel.rs/) /[ documentation](http://nickel-org.github.io/nickel.rs))
  - **rocket** ([homepage](https://rocket.rs/) /[ repository](https://github.com/SergioBenitez/rocket) /[ documentation](https://rocket.rs/guide/))
  - **rouille** ( - /[ repository](https://github.com/tomaka/rouille) /[ documentation](http://tomaka.github.io/rouille/rouille/index.html))
  - **Thruster** ( - /[ repository](https://github.com/trezm/Thruster) /[ documentation](https://docs.rs/thruster) /[ examples](https://github.com/trezm/Thruster/tree/master/examples))
  - **Tide** ( - /[ repository](https://github.com/rustasync/tide) /[ documentation](https://docs.rs/tide) /[ examples](https://github.com/rustasync/tide/tree/master/examples))
  - **tower-web** ( - /[ repository](https://github.com/carllerche/tower-web) /[ documentation](https://docs.rs/tower-web/) /[ examples](https://github.com/carllerche/tower-web/tree/master/examples))
  - **warp** ( - /[ repository](https://github.com/seanmonstar/warp) /[ documentation](https://docs.rs/warp/) /[ examples](https://github.com/seanmonstar/warp/tree/master/examples))
- Static site generators
  - **zola** ([homepage](https://www.getzola.org/) /[ repository](https://github.com/getzola/zola) /[ documentation](https://www.getzola.org/documentation/getting-started/installation/))
- Templating frameworks
  - **tera** ([homepage](https://tera.netlify.com/) /[ repository](https://github.com/Keats/tera) /[ documentation](https://docs.rs/tera/))
  - **mustache** (- /[ repository](https://github.com/nickel-org/rust-mustache) /[ documentation](http://nickel-org.github.io/rust-mustache))
  - **liquid** (- /[ repository](https://github.com/cobalt-org/liquid-rust) / - )
  - **handlebars** (- /[ repository](https://github.com/sunng87/handlebars-rust) /[ documentation](https://docs.rs/crate/handlebars/))
  - **horrorshow** (- /[ repository](https://github.com/Stebalien/horrorshow-rs) /[ documentation](https://stebalien.github.io/horrorshow-rs/horrorshow/))
  - **maud** ([homepage](https://lfairy.gitbooks.io/maud/content/) /[ repository](https://github.com/lfairy/maud) /[ documentation](https://lambda.xyz/maud/maud/))
  - **askama** (- /[ repository](https://github.com/djc/askama) /[ documentation](https://docs.rs/askama/) )
  - **stpl** (- /[ repository](https://github.com/dpc/stpl) / - )
  - **ructe** (- /[ repository](https://github.com/kaj/ructe) /[ documentation](https://docs.rs/ructe/) )
  - **typed-html** (- /[ repository](https://github.com/bodil/typed-html) /[ documentation](https://docs.rs/typed-html/) )
- Websocket frameworks
  - **websocket** ([homepage](https://websockets-rs.github.io/rust-websocket/) /[ repository](https://github.com/cyderize/rust-websocket) /[ documentation](https://websockets-rs.github.io/rust-websocket/doc/websocket/))
  - **ws-rs** ([homepage](https://ws-rs.org) /[ repository](https://github.com/housleyjk/ws-rs) /[ documentation](https://ws-rs.org/docs))
  - **tungstenite** ( - /[ repository](https://github.com/snapview/tungstenite-rs) /[ documentation](https://docs.rs/crate/tungstenite/))
  - **actix-web** ([homepage](https://actix.rs/) /[ repository](https://github.com/actix/actix-web) /[ documentation](https://actix.github.io/actix-web/actix_web/))

Again, this is a bit overwhelming for a new person learning Rust. It’s difficult to know what to choose. However, it’s also a benefit having the ability to try out various solutions and see what works best.

### Learning

Similar to the Community category, learning can be quite difficult to narrow down. I have tried my best to highlight the main areas and a few examples for each category. Know that this list is non-exhaustive and more a brief survey into this area of the ecosystem.

- Articles
  - [A collection of notable Rust bloggers](https://gist.github.com/brson/a324c83a6af6a8a78dfaa9d33eb9b48e)
  - Each week, [This Week in Rust](https://this-week-in-rust.org/blog/2020/04/14/this-week-in-rust-334/) shares articles
  - [Fearless Rust Bloggers](https://users.rust-lang.org/t/fearless-rust-bloggers/16770)
  - [Learning Rust - Pascal Precht](https://pascalprecht.github.io/posts/learning-rust)
  - [Read Rust](https://readrust.net/) - Rust blog post aggregator
  - [Writing an OS in Rust](https://os.phil-opp.com/)
- Books
  - [Programming Rust - O’Reilly Media](http://shop.oreilly.com/product/0636920040385.do)
  - [Rust in Action - Manning](https://www.manning.com/books/rust-in-action)
- Bootcamps
  - No response on [Rust users forum](https://users.rust-lang.org/t/any-bootcamps-that-teach-rust/41279)
  - No response on [Twitter](https://twitter.com/jsjoeio/status/1252297374669496321)
  - [NobleProg Rust microcourse](https://www.nobleprog.com/cc/rust3d?participants=1&how=public)
- Classes (specifically academic, in universities)
  - [Northwestern University](https://www.mccormick.northwestern.edu/computer-science/academics/courses/descriptions/396-496-9.html)
  - [Rust being taught at University of Maryland, College Park](https://www.cs.umd.edu/class/spring2018/cmsc330/)
  - [Stanford’s Programming Languages course dedicates 3.5 weeks to Rust](https://cs242.stanford.edu/f19/)
  - [Stanford’s Operating Systems course in Rust](https://cs140e.sergio.bz/)
  - [University of Pennsylvania](http://cis198-2016s.github.io/schedule/)
  - [University of Virginia](http://www.cs.virginia.edu/~evans/cs4414/) (first class)
- Tutorials
  - [Rustlings](https://github.com/rust-lang/rustlings) - Small exercises to get you used to reading and writing Rust code
  - [rust-learning](https://github.com/ctjhoa/rust-learning) - detailed list of awesome learning materials
  - [Tour of Rust](https://tourofrust.com/) - Step by step guide through the features of the Rust programming language
  - Courses
    - [Intro to Rust](https://www.youtube.com/playlist?list=PLJbE2Yu2zumDF6BX6_RdPisRVHgzV02NW) - YouTube
    - [Rust Crash Course](https://www.youtube.com/watch?v=zF34dRivLOw) - YouTube
    - [Rust Projects](https://www.youtube.com/playlist?list=PLJbE2Yu2zumDD5vy2BuSHvFZU0a6RDmgb) - YouTube
    - [The Rust Programming Language](https://www.udemy.com/course/rust-lang/) - Udemy
    - [Using Web Assembly with Rust](https://egghead.io/courses/using-webassembly-with-rust) - egghead
    - [Write your First Program with Rust](https://egghead.io/courses/write-your-first-program-with-the-rust-language) - egghead
  - Videos
    - [Learning Rust](https://www.youtube.com/playlist?list=PLywCmJ05v3PhlDgxPAW1ryxHZJ9Tjohpi) - two people pair-programming and going chapter by chapter through the Rust Lang Book
    - [Into_rust](http://intorust.com/) - screencast series
- Workshops
  - [Ferrous Systems](https://ferrous-systems.com/) - paid workshops for companies and teams
  - [RustBridge](https://rustbridge.com/) - an organization that is part of the official Rust group.
  - [Systems Programming with Rust](https://qconnewyork.com/ny2019/workshop/systems-programming-rust) (at a conference)

### Packages

One of the most important aspects of a programming language ecosystem is a way to share code with others. In the Rust ecosystem, the most common way is through packages, more commonly referred to as “crates”. Below are links to two places where you can share code (your own private registry or the public one):

- [Cloudsmith](https://cloudsmith.io/l/cargo-registry/) - create your own private cargo registry
- [crates.io](https://crates.io/) - “The Rust community’s crate registry”
- [libs.rs](https://lib.rs/) - "Fast, lightweight, opinionated, unofficial alternative to crates.io"

### Platforms

The objective for this section was to figure out where Rust code can run. What platforms or systems are people targeting or building for? We saw a few of these mentioned in the Frameworks section. Here are the most common ones I could find (and some examples):

- Browser
  - [WebAssembly](https://rustwasm.github.io/book/reference/deploying-to-production.html)
  - [Wasm-bindgem](https://rustwasm.github.io/wasm-bindgen/reference/deployment.html)
  - [Rust to WASM](https://github.com/zeit/next.js/tree/canary/examples/with-webassembly) + Next
- CLI Apps
  - [clap](https://github.com/clap-rs/clap)
  - Build binaries for Linux, macOS and Windows
- Embedded Devices
  - [https://www.rust-lang.org/what/embedded](https://www.rust-lang.org/what/embedded)
- Operating System
  - [Writing an OS in Rust](https://os.phil-opp.com/)
- Mobile Apps
  - [Building an iOS App in Rust, Part 1: Getting Started with Rust](https://www.bignerdranch.com/blog/building-an-ios-app-in-rust-part-1-getting-started-with-rust/)
  - [Example project for building a library for iOS + Android in Rust ](https://github.com/kennytm/rust-ios-android)
- Server
  - [Deploying to Heroku](https://github.com/emk/heroku-buildpack-rust)
- Anywhere?
  - [Rust Once, Run Everywhere](https://blog.rust-lang.org/2015/04/24/Rust-Once-Run-Everywhere.html)

### Selling Points

Everyone will have their favorite reasons for using one language over another. I tried to select articles related to the selling points, but also highlight features of the language brought up by people who advocate for it.

- Articles
  - [How often does Rust change?](https://words.steveklabnik.com/how-often-does-rust-change)
  - [Rust programming language: Seven reasons why you should learn it in 2019](https://www.techrepublic.com/article/rust-programming-language-seven-reasons-why-you-should-learn-it-in-2019/)
  - [What is Rust and why is it so popular?](https://stackoverflow.blog/2020/01/20/what-is-rust-and-why-is-it-so-popular/)
  - [Why Rust?](https://medium.com/paritytech/why-rust-846fd3320d3f)
  - [Why should I use Rust?](https://www.reddit.com/r/rust/comments/4l44z3/why_should_i_use_rust/)
- Features
  - Borrow checker (“[Rust has a static garbage collector](https://words.steveklabnik.com/borrow-checking-escape-analysis-and-the-generational-hypothesis)”)
  - Community
  - [Ownership model](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html)
  - Package manager
  - Performance
  - Productivity
    - Excellent documentation
    - Built-in tools (cargo, fmt, clippy)
  - Smart memory-management
  - Type system
- Other
  - Used by big companies (talk about Facebook, Microsoft, Amazon, etc.)

_\*Note: this section also piggybacks off the Use Cases section (coming up)._

Beyond this, I would encourage you to read the results from the Rust 2019 survey which asked [“Why not use Rust”](https://blog.rust-lang.org/2020/04/17/Rust-survey-2019.html#why-not-use-rust). Not all points relate to selling points, but it may provide insight into _what would_ sell people on using Rust if these things were fixed.

### Tools

The tools used for writing and using the programming language is an aspect we sometimes forget. This affects the developer experience and can drive or hinder the ecosystem. Here are some highlights:

- Benchmarking
  - [criterion](https://bheisler.github.io/criterion.rs/book/index.html) - Statistics-driven Microbenchmarking
- [Built-in testing support](https://doc.rust-lang.org/book/ch11-01-writing-tests.html)
- Cargo
  - Build (macOS, Windows, Linux)
  - [Clippy](https://github.com/rust-lang/rust-clippy)
  - [Rustdoc](https://doc.rust-lang.org/rustdoc/what-is-rustdoc.html)
  - [rustfmt](https://github.com/rust-lang/rustfmt)
- IDE support
  - [https://www.rust-lang.org/tools](https://www.rust-lang.org/tools)
  - Hover over documentation in editor
- [Rust Playground](https://play.rust-lang.org/) - test code online, share with others

### Use Cases

Deriving some of the tops results from the [Rust Survey 2019](https://blog.rust-lang.org/2020/04/17/Rust-survey-2019.html), here are the main industries/applications that responded in the survey and are using Rust:

- Top 10 from survey
  - Backend Web Applications
  - Distributed Systems
  - Embedded Devices
  - Enterprise Software
  - Frontend Web Applications
  - Internet of Things
  - IT
  - Network Programming
  - Security
  - Technology
- Other
  - Blockchain ([Libra](https://github.com/libra/libra) [Move](https://developers.libra.org/docs/move-overview)) [Solana](https://github.com/solana-labs/solana)
  - [Deno](https://github.com/denoland/deno) - [uses JavaScript engine written in Rust](https://www.zdnet.com/article/deno-1-0-node-js-makers-have-new-javascript-runtime-for-typescript-programming-language/)
    - [1.0 Announcement](https://deno.land/v1)

## Summary

Reflecting on what we have covered thus far, we can see that the Rust ecosystem is well-developed and growing. This is not a conclusive/comprehensive list of the ecosystem or the companies using it. From my knowledge, Rust is used at big companies such as Amazon, Apple, Microsoft and Google. They are all investing in the language. We’ve covered the ecosystem from a bird’s-eye view as we see it today. Here are the main things to walk away with:

- Overview
  - The community is ubiquitous both online and in-person
  - There is no shortage of books or references to read from the official Rust groups
  - Rust can be used for writing web, mobile, and CLI apps, servers embedded devices, and OS’s
  - Rust is fast, well-documented, type-safe, manages memory efficiently, but has a steep learning curve

### What’s next?

We plan to use this information when making decisions and building strategies for us to get involved with the Rust ecosystem. If you’d like to collaborate with us, please reach out to me over [DMs on Twitter](https://twitter.com/jsjoeio)! We would love to work with you. Thank you for reading!

### Thank you

To close out, I’d like to give thanks to the following people for their contributions and feedback. I appreciate all of you!

- David Tolnay
- Pedro Rittner
- Jk Jensen
- Joe Savona
- Nell Shamrell-Harrington
- Lauren Tan
- Kathy Kam
- Cami Williams
- Joel Marcey
