# nodebb email blacklist plugin
An email blacklist plugin for nodebb - only let's users register with an email address not in the blacklisted email domain list.  
It can also use [isTempMail API](https://www.istempmail.com) to check the domain.
  
You can add email domain to the blacklist (one per line)  
Example of available list:
- [A list of domains for disposable and temporary email addresses](https://gist.github.com/adamloving/4401361)
- [List of disposable email provider domains](https://gist.github.com/michenriksen/8710649)
- [Disposable Email Blacklist](https://github.com/martenson/disposable-email-domains/blob/master/disposable_email_blacklist.conf)

Tested with nodebb 1.4.5
