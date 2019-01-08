# occ-shared-resource-bundles
"Chunked" Dynamically Linked Libraries(DLL) via webpack for [Oracle Commerce Cloud](https://cloud.oracle.com/en_US/commerce-cloud "Oracle Commerce Cloud") .  
Use with [occ-react-component](https://github.com/leedium/occ-react-component) or any webpack application.   
Note: This particular version compiles to AMD RequireJS modules.

#### version 2.0.0

## Release Notes
2.0.0
  - Full Refactor to Shared Resource Bundle using webpack SplitChunks
  - Base library includes
  ```
   "dependencies": {
      "classnames": "^2.2.6",
      "react": "^16.7.0",
      "react-dom": "^16.7.0",
      "react-hot-loader": "^4.6.3",
      "styled-components": "^4.1.3"
    }
  ```

## About
This library is used as the primary dependency resource for multiple webpack applications such as the
[occ-react-component](https://github.com/leedium/occ-react-component "Standalone react components for Oracle Commerce Cloud") The idea is that you have self contained [Oracle Commerce Cloud](https://cloud.oracle.com/en_US/commerce-cloud "Oracle Commerce Cloud") React Applications suckling off the teet of the vendor bundles. SUPER cool stuff.  This reduces dependency redundencies across your installed modules, optimizes load time, and speeds up development.

## Instructions

1. Install the dependencies you wish to include in your global bundle.
```
$ npm i {YOUR_MODULES ...} --save
```

2. Add those modules to the `webpack.config.js` entry configuration array so they will be included in the build
```
entry: {
    "vendor": [
        'react',
        'react-dom',
        ...
        ...
    ]
}
```

3. Update `webpack.config.js` with the name of the [OCC Application Widget](https://docs.oracle.com/cd/E97801_02/Cloud.18D/WidgetDev/html/s0701includeapplicationleveljavascrip01.html) file that will be installed into your OCCS instance.
You will use the DCU to upload the file in step 5
```$xslt
  OCC_GLOBAL_FILE_NAME: {FILE NAME}
```

<b>Important</b> For step 4, DO NOT use webpack minification as OCC already performs this task and you will waste hours
wondering what's wrong.

4. Build either a development or production version.   

Development: contains Hot Module reload dependencies as well as sourcemaps. (Minified)   
```$xslt
$ nmp run build:dev
```

Production: Contains only production level dependencies or their respective production states. (Not minified).
```$xslt
$ nmp run build:prod
```

Both: Will build both versions
```$xslt
$ nmp run build
```
\*  the compiled filename will be postfixed with '-[dev | prod]'

5. To deploy bundle to your OCCS, Rename `vendor/DLL/vebdor-prod.dll.js` to the `OCC_GLOBAL_FILE_NAME` you specified in step 3.
`dcu --put` that file directly into the OCCS globals folder.  Unless you want to be able to uninstall this,
you don't need to create an actual widget. (make sure you have the registration key set up in your instance)

Steps:
```$xslt
// 1. DCU grab
$ dcu --grab --clean -n https://{your instance}.oracleoutsourcing.com

// 2. Deploy
$ dcu --put global/{OCC_GLOBAL_FILE_NAME} --node https://{OCCS_INSTANCE}.oracleoutsourcing.com -k {APPLICATION KEY
```
Verify that your file is there by inspecting the network requests in your browser.


6. Copy both the dev and prod `vendorManifest/vendor-{prod|dev}.json` files to your [occ-react-component](https://github.com/leedium/occ-react-component "Standalone react components for Oracle Commerce Cloud") folder

7. Go [here](https://github.com/leedium/occ-react-component) for instructions in setting up your component.  (React example)!


## Credits
[nodejs](https://github.com/nodejs/node)  
[webpack 4](https://webpack.js.org/)  
[babel 7](https://github.com/babel/babel)  
[eslint](https://eslint.org/ "Eslint")  
[react flow](https://flow.org/en/docs/frameworks/react/ "React Flow")  
[reactjs](https://github.com/facebook/react/)  
[react-hot-loader](https://github.com/gaearon/react-hot-loader)  
[styled-components](https://github.com/styled-components/styled-components)  
[Oracle DCU](https://docs.oracle.com/cd/E97801_02/Cloud.18D/ExtendingCC/html/s4405usethedcutograbanduploadsourceco01.html)  

## Related
Check out the [React Solution for Oracle Commerce cloud](https://github.com/leedium/occ-react-solution "Oracle Commerce Cloud React Solution") for a working proof on concept of how to use React as a quasi headless UI framework integrated into the OCC Admin.   



<br/><br/><br/>
## Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.
