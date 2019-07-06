# chromedriver-example

js-framework-benchmarks initializes a new chrome instance for each benchmark run, which happens quite often. On linux this is quite fast, but on windows it gets really slow.
run `npm install` to set it up.

## Output for windows
For the remote runner start chromedriver on port 9999:
```
.\node_modules\.bin\chromedriver.cmd --port=9998 --verbose --log-path=chromedriver.log
```
In a new console run the following test against the remote chrome driver stated above:
```
λ npm run run-remote

> chromedriver-example@1.0.0 run-remote C:\Users\Stefa\Source\Javascript\chromedriver-example
> cross-env SELENIUM_REMOTE_URL=http://localhost:9998 node run-remote-chromedriver.js

main: 3.369ms driver is created
main: 5562.506ms page was loaded
```
js-framework-benchmark starts chromedriver iself. A test that uses a similar initialization can be invoked like that:
```
λ npm run run-local

> chromedriver-example@1.0.0 run-local C:\Users\Stefa\Source\Javascript\chromedriver-example
> node run-js-framework-benchmark.js

main: 19.058ms chromedriver required
main: 24.770ms configuration has been prepared
main: 28.691ms driver is created

DevTools listening on ws://127.0.0.1:53578/devtools/browser/7faec849-9fb1-46b5-8bc3-881eb6443020
main: 10090.361ms page was loaded
```
## Output for linux
```
./node_modules/.bin/chromedriver --port=9998 --verbose --log-path=chromedriver.log
```
remote chromedriver:
```
[stefan@blade chromedriver-example]$ npm run run-remote

> chromedriver-example@1.0.0 run-remote /data/stefan/Source/Javascript/chromedriver-example
> cross-env SELENIUM_REMOTE_URL=http://localhost:9998 node run-remote-chromedriver.js

main: 1.627ms driver is created
main: 1663.900ms page was loaded
```
local run:
```
stefan@blade chromedriver-example]$ npm run run-local

> chromedriver-example@1.0.0 run-local /data/stefan/Source/Javascript/chromedriver-example
> node run-js-framework-benchmark.js

main: 4.846ms chromedriver required
main: 7.237ms configuration has been prepared
main: 8.442ms driver is created
main: 2234.075ms page was loaded
```
## Difference in chromedriver log files
The windows log contains a timeout which appears to cause a 4 second pause.
```
[1562413917.724][INFO]: resolved localhost to ["::1","127.0.0.1"]
[1562413919.716][WARNING]: Timed out connecting to Chrome, retrying...
[1562413919.718][INFO]: resolved localhost to ["::1","127.0.0.1"]
[1562413921.730][DEBUG]: DevTools WebSocket Command: Log.enable (id=1) 1F35B060A99629DD7664039E2FCF7916 {
```

