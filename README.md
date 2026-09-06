# Save URLs

Save URLs is a lightweight Firefox extension that sends the URL and title of
each fully loaded tab to a server you control. It is useful for personal
reading lists, bookmark services, and self-hosted URL collectors.

## How it works

1. Open the extension options and enter your server URL.
2. Include the protocol (`http://` or `https://`) and a trailing slash.
3. Save the server URL.
4. Whenever a tab finishes loading, the extension sends a request containing:

   - `url`: the tab URL
   - `title`: the tab title
   - `timestamp`: the current Unix timestamp in milliseconds

The request is made by appending these URL-encoded parameters to the
configured server URL.

## Installation

### Temporary installation for development

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Select **This Firefox**.
3. Choose **Load Temporary Add-on...**.
4. Select `ext/manifest.json`.

The extension remains installed until Firefox is closed or it is removed from
the debugging page.

### Installing a release

Download the `.xpi` file from the
[GitHub Releases](https://github.com/mcavdar/save-url/releases) page and open
it with Firefox. Firefox may require a signed release for permanent
installation.

## Server configuration

The extension does not provide a server. Configure the URL of an endpoint
that accepts the appended query parameters, for example:

```text
http://127.0.0.1:8000/
```

The endpoint should accept a request equivalent to:

```text
http://127.0.0.1:8000/url=https%3A%2F%2Fexample.com&title=Example&timestamp=1700000000000
```

The extension stores the configured value in Firefox synchronized storage.
Do not include credentials or other sensitive values in the URL unless your
server and browser profile are configured to protect them.

## Project layout

```text
ext/
  background.js  Sends tab data after a page finishes loading
  manifest.json  Firefox extension metadata and permissions
  options.html   Server URL configuration page
  options.js     Saves and restores the configured server URL
updates.json     Firefox automatic update manifest
```

## Development

No build step is required. Edit the files in `ext/`, reload the temporary
extension from `about:debugging`, and open the extension options to test
changes.

The extension currently uses Manifest V2 and requires Firefox 126 or newer.

## License

No license has been specified for this project yet.
