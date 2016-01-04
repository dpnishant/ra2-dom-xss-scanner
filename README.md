# <a name="Introduction"></a>Introduction[](#Introduction)

**Ra.2**: _A DOM-based XSS scanner, for the rest of us!_

Ra.2 - Blackbox DOM-based XSS Scanner is our approach towards finding a solution to the problem of detecting DOM-based Cross-Site Scripting vulnerabilities in Web-Application automatically, effectively and fast. Ra.2 is basically a lighweight Mozilla Firefox Add-on that uses a very simple yet effective and unique approach to detect most DOM-based XSS vulnerabilities, if not all. Being a browser-add on it is a session-aware tool which can scan a web-application that requires authentication. Ra.2 uses custom collected list of XSS vectors which has been heavily modified to be compatible with its scanning technology. The add-on also implements basic browser intrumentation to simulate a human interaction to trigger some hard to detect DOM-based XSS conditions.

# <a name="Features"></a>Features[](#Features)

**False positive free by design: Vulnerable URLs are saved in DB, if and only if, our payload is executed successfully by the browser. Hence marked exploitable. If isn't false-positive, it's a bug! Report us :-)**

**Large collection of injection vectors, includes “modified” R’Snake’s vectors as well.**

**Supports transforming Unicode characters for testing content aware application.**

**Automatically handles JavaScript[?](/p/ra2-dom-xss-scanner/w/edit/JavaScript) obfuscation/compression, as it relies on native interpreter.**

**Fast and light-weight.**

**Pretty easy learning curve. Point-n-Click.**

**Basic browser automation support: Simulates some of the browser events that require human interaction to trigger the XSS condition. Example:**

<pre class="prettyprint lang-html">**<span class="tag"><a</span> <span class="pln"></span> <span class="atn">href</span><span class="pun">=</span><span class="atv">"javascript:alert(/XSS/)></span><span class="pln">Click here</span><span class="tag"></a></span>**</pre>

**

<pre class="prettyprint lang-html"><span class="tag"><input</span> <span class="pln"></span> <span class="atn">type</span><span class="pun">=</span><span class="atv">"button"</span> <span class="pln"></span> <span class="atn">value</span><span class="pun">=</span><span class="atv">"Continue"</span> <span class="pln"></span> <span class="atn">onclick</span><span class="pun">=</span><span class="atv">"javascript:alert(/XSS/) /></span></pre>

and similar scenarios.**

**Centralized reporting: Suitable for enterprise standard multi-user environment.**

# <a name="Ra.2_Architecture"></a>Ra.2 Architecture[](#Ra.2_Architecture)

**Goodness of Automation + Goodness Blackbox Fuzzing = Win!**

[![](http://daspatnaik.com/ra2/ra2-arch.png)](http://nishant.daspatnaik.com)

# <a name="Ra.2_Internals"></a>Ra.2 Internals[](#Ra.2_Internals)

[![](http://daspatnaik.com/ra2/ra2-internals.png)](http://nishant.daspatnaik.com)
