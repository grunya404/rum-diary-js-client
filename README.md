# rum-diary-js-client

[![Build Status](https://api.shippable.com/projects/53850181f9224082017995d7/badge/master)](https://www.shippable.com/projects/53850181f9224082017995d7)

rum-diary compatible JavaScript client - Capture RUM: timers, events, navigation timing, resource timing.

## Installation

### Bower
The easiest way to install rum-diary-js-client is through bower.

1. `bower install rum-diary-js-client`
2. Add a script to your HTML
```html
<script src="bower_components/rum-diary-js-client/dist/rum-diary-js-client.js" defer async></script>
```

### Clone the git repo
If bower isn't your thing, it is easy to do things the old fashioned way.

1. `git clone https://github.com/shane-tomlinson/rum-diary-js-client.git`
2. Copy `rum-diary-js-client/dist/rum-diary-js-client.js` to a location of your choice.
3. Add a script tag to the copied file from step 2.

## Configuration
The client is configured through `data-` attributes on the `script` element.

### `data-autoinit`
If `data-autoinit` is set to `false`, automatic initialization will not occur and
the client must be manually initialized. See `Advanced use`

Defaults to `true`

### `data-tags`
Comma separated list of tags to send to the server. Useful when performing
experiments to tag a data set as belonging to a certain class.

Defaults to empty.

### `data-load_url`
URL where to send "load" data. "Load" data is data that is available at the time
of `window.onload`. This includes navigationTiming data, referrer, and whether
the user is a returning user.

Defaults to `/metrics`

* `data-unload_url`
URL where to send "unload" data. "Unload" data is data that is available at the time
of `window.onunload`. This includes events, timers, and page view duration.

Defaults to `/metrics`

## Advanced use

### Manual use
Manual use is normally only needed for access to the events and timers functionality.

First, set `data-autoinit` to `false` in the script tag.

```html
<script src="/bower_components/rum-diary-js-client/dist/rum-diary-js-client.js" data-autoinit="false" defer async></script>
```

Get a reference to the JS client. For more on how, see below. Once a reference
is obtained, instantiate a client instance.

```js
var client = new RumDiaryJSClient();
client.init({
  tags: 'experiment1266',
  loadUrl: '/my_stats_collector',
  unloadUrl: '/my_stats_collector'
});
```

### Obtain a reference to the client

#### Use without a module loader
If used without a module loader, the client is accessible via `window.RumDiaryJSClient`.

#### With Requirejs
Rum-diary-js-client is AMD ready and can be used like any other AMD module.

#### With Browserify
Rum-diary-js-client is UMD ready and can be used with Browserify.

### Client API

#### `getLoad`
Get data avaialble at `window.load`

#### `sendLoad`
Send data available at `window.load` to the `loadUrl` specified in init.

#### `getUnload`
Get data avaialble at `window.unload`. This includes events, timers, and duration.

#### `sendUnload`
Send data available at `window.unload` to the `unloadUrl` specified in init.

#### `logEvent`
Log an event.
```js
client.logEvent('my-event');
```

#### `startTimer`
Start a timer.
```js
client.startTimer('my-timer');
```

#### `stopTimer`
Stop a timer.
```js
client.stopTimer('my-timer');
```

## Get Involved:

## Author:
* Shane Tomlinson
* shane@shanetomlinson.com
* stomlinson@mozilla.com
* set117@yahoo.com
* https://shanetomlinson.com
* https://github.com/shane-tomlinson
* @shane_tomlinson

## License:
This software is available under version 2.0 of the MPL:

  https://www.mozilla.org/MPL/


