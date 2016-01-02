# Introduction #

**Ra.2**: _A DOM-based XSS scanner, for the rest of us!_

Ra.2 - Blackbox DOM-based XSS Scanner is our approach towards finding a solution to the problem of detecting DOM-based Cross-Site Scripting vulnerabilities in Web-Application automatically, effectively and fast. Ra.2 is basically a lighweight Mozilla Firefox Add-on that uses a very simple yet effective and unique approach to detect most DOM-based XSS vulnerabilities, if not all. Being a browser-add on it is a session-aware tool which can scan a web-application that requires authentication. Ra.2 uses custom collected list of XSS vectors which has been heavily modified to be compatible with its scanning technology. The add-on also implements basic browser intrumentation to simulate a human interaction to trigger some hard to detect DOM-based XSS conditions.


# Features #

**False positive free by design: Vulnerable URLs are saved in DB, if and only if, our payload is executed successfully by the browser. Hence marked exploitable. If isn't false-positive, it's a bug! Report us :-)**

**Large collection of injection vectors, includes “modified” R’Snake’s vectors as well.**

**Supports transforming Unicode characters for testing content aware application.**

**Automatically handles JavaScript obfuscation/compression, as it relies on native interpreter.**

**Fast and light-weight.**

**Pretty easy learning curve. Point-n-Click.**

**Basic browser automation support: Simulates some of the browser events that require human interaction to trigger the XSS condition. Example:**```html
<a href="javascript:alert(/XSS/)>Click here

Unknown end tag for &lt;/a&gt;

```
```html
<input type="button" value="Continue" onclick="javascript:alert(/XSS/) />``` and similar scenarios.

**Centralized reporting: Suitable for enterprise standard multi-user environment.**

# Ra.2 Architecture #

**Goodness of Automation + Goodness Blackbox Fuzzing = Win!**

[![](http://daspatnaik.com/ra2/ra2-arch.png)](http://nishant.daspatnaik.com)

# Ra.2 Internals #

[![](http://daspatnaik.com/ra2/ra2-internals.png)](http://nishant.daspatnaik.com)