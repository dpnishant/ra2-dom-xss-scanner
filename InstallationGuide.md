# Ra.2 DOM-based XSS Scanner Installation & Setup Manual #

### Introduction ###

---


This is a quick readme to get you started with the tool. Be warned that this tool is in no way a completely developed tool. In fact it is a dirty proof-of-concept. Work is in progress!
This tool and its source code is released under the terms and conditions of GNU GPL v3 license. By installing and using this tool, you comply with the GNU GPL v3 license's terms and conditions.

### Installation (Windows) ###

---


1. Download the `"ra.two.zip"` file and extract to disk. We have tested it to be working fine on Mozilla Firefox Version 3.6.0 and above till ver. 14.0 running on Windows 7 64bit. Your mileage may vary.

2. 2. Download and unzip `"add-on-installer.zip"` and extract the file `"ra2@domxssscanner.app"` file. Now edit it and remove all lines and add the path of the extracted folder `"ra.two"` , you did in Step 1.

3. Go to your default Mozilla Profile, found at `"%APPDATA%\Mozilla\Firefox\Profiles\"`. Profile directories are usually some junk strings with a `".default"` suffix to the folder name. (A valid profile path looks as follows `"%APPDATA%\Mozilla\Firefox\Profiles\ujcbxsry.default\"`).

Now go to the "extensions" folder within the profiles directory. Now copy the `"ra2@domxssscanner.app"` file into this directory i.e. `"%APPDATA%\Mozilla\Firefox\Profiles\ujcbxsry.default\extensions"`. (NOTE: `"ujcbxsry.default"` is just an example, it may be different in your case).

4. Download the archive "vectors.zip". Extract the contents ("xss.txt") to a folder. Rename the folder "xss" and copy it to the root of "C:". The resulting path should be `"C:\xss\xss.txt"`.

5. Download the archive "reporting-tool.zip". Extract the contents to the webroot of your Apache server. We have tested it using the XAMPP & Wamp package (http://www.apachefriends.org/en/xampp.html). In our case the path is `"C:\xampp\htdocs\xss\"` or `"C:\wamp\www\xss"`

6. Finally import the database schema (`"db_schema.sql"`) to the MySQL via phpMyAdmin, required for the reporting tool. This would create the necessary tables and columns into the database.

7. The tool should be ready to use. If you find anything not working or buggy, please email us or raise a ticket at http://code.google.com/p/ra2-dom-xss-scanner/issues/list


### Installation Tutorial (Mac OS X and Linux) ###

---

Please watch the video (on YouTube) here: http://www.youtube.com/v/2TrOTKCuIhw