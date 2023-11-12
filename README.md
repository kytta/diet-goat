# Diet Goat™

> A lightweight replacement for GoatCounter's counter

Diet Goat is a modern and minimal alternative for [GoatCounter]'s `count.js`. If you use it correctly, it will easily replace the official script in 99% of the use cases. **However**, it can't do everything.

Unlike the official count.js, Diet Goat

- is ESM-only
- uses modern JavaScript APIs (like `URL` and `URLSearchParams`)
- has proper type definitions
- will not fire on load
- will not count if the browser cannot `sendBeacon()`
- does not read any `[data-goatcounter-settings]`, providing these defaults:
  - `no_onload` is `true`
  - `no_events` is `false`
  - `allow_local` is `false`
  - `allow_frame` is `false`
- will not auto-bind events
- does not support data parameter callbacks
- does not append a cache-buster
- cannot show a visitor counter
- cannot disable itself on `#toggle-goatcounter`
  - **but** it will respect the LocalStorage item, if present
- does not print warnings to the console

With all these limitations, Diet Goat is around 500 bytes when minified and brotli'ed, which is more than 3x smaller than the official script.

## Use

As mentioned previously, Diet Goat is an ESM-only script without any automatic counting. To use it, import it in a module script and run `count()`:

```html
<script type="module">
  import { count } from "https://cdn.jsdelivr.net/npm/diet-goat@3/+esm";

  count("https://yourdomain.goatcounter.com");
</script>
```

> [!NOTE]
> The major version of Diet Goat will match the major version of the official script. There are no versions 2 and 3.

By calling the method inside `<script type="module">`, it will execute after the page loads, so you do not have to worry about `DOMContentLoaded` any more.

If you want to re-define the re-definable parameters (path, title, or referrer) or mark the visit as an event, you can add a second parameter:

```html
<script type="module">
  import { count } from "https://cdn.jsdelivr.net/npm/diet-goat@3/+esm";

  count("https://yourdomain.goatcounter.com", {
    p: "/", // count everything as if it's an index page
  });

  querySelector("button#like").addEventListener("click", () => {
    count("https://yourdomain.goatcounter.com", {
      p: "Like button slapped",
      e: true,
    });
  });
</script>
```

## License

© 2023 [Nikita Karamov]\
Licensed under the [ISC License].

Based on the original `count.js`, version 3.\
© 2021–2023 [Martin Tournoij]\
Licensed under the [ISC License].

---

This project is hosted on GitHub: <https://github.com/kytta/diet-goat.git>

[goatcounter]: https://www.goatcounter.com/
[isc license]: https://spdx.org/licenses/ISC.html
[martin tournoij]: https://www.arp242.net/
[nikita karamov]: https://www.kytta.dev/
