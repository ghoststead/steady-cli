![GitHub](https://img.shields.io/github/license/ghoststead/steady-cli?label=License)
![Coverage](./badges/coverage.svg)

# CLI for programmatically maintaining Ghost sites
`steady-cli` is an all-in-one tool for Ghost theme development and maintaining Ghost sites programmatically.

## Benefits
* create and locally develop a new Ghost theme.
* maintain your Ghost site programmatically without
having to go back and forth to the Admin UI.
* easily integerated into an existing build process.

## Prerequisites
* NodeJS/npm
* A existing Ghost site with administrator access 

## Installation
```shell script
npm install -g steady-cli
```

or on a per-project basis:
```shell script
npm install --save-dev steady-cli
```

## Create an integration in your site (for publish)
* Go to the Integration Settings link in your Ghost site and click `Add custom integration`.
* Give the new integration any name you want e.g. Ghoststead and hit 'Create'.
* Note the 'Admin API Key' to be used later.

This integration will be used to `publish` your theme to an existing site.

## Usage

### Create a new theme
From an empty directory where you want your setup to live:
```shell script
steady setup
```
The `setup` command will install the following:
* a local version of Ghost
* a new theme under `content/data/ghoststead`

If you want to check your theme into `git` (and you should),
check in the contents of the `content/data/ghoststead` directory only.
i.e. the `ghoststead` directory should be the top level directory in your git repository.

### Start/Stop Ghost
Start the local version of Ghost that was installed via `setup` by running the command:
```shell script
steady start
```
The `start` command will run a development version of Ghost in the background.
Log files may be found under `content/logs`.

You can stop your Ghost instance via:
```shell script
steady stop
```

### Theme development
In order to develop a new theme,  you have to build it.
Depending on your theme the build may perform many steps but at a minimum it needs
to compile Sass files into css.  `steady-cli` can watch your theme for file changes and
automatically build your theme when something changes.  Run:
```shell script
steady develop
```

The `develop` command runs in the foreground and automatically rebuilds your theme whenever a source file is modified.
You can easily extend this process by adding additional `grunt` tasks in `content/themes/ghoststead/grunfile.js`.

If your theme name changes from the default `ghoststead`, you can add set the new theme name in the `.steadyrc` file via:

```json
{
    "themeName": "mytheme"
}
```
where `mytheme` is replaces by the name of your theme.  Your theme should be located - for instance, checked out if using source control - in `content/themes`
along side the `ghoststead` and `casper` themes.


### Upload a theme
To upload a theme using the steady CLI, you have to create a integration in your site and
set both `siteUrl` and `adminApiKey` in your `.steadyrc` file.  The `.steadyrc` file was automatically
created when running the 'setup' command.  You may recreate the the rc file via:
```
steady initrc
```

Once your `.steadyrc` file is configured, you can upload a built theme via:
```
steady publish
```

This command will upload the zipped theme from your theme's `dist` directory using the configuration
in the theme `package.json` file.

If you want to upload a different theme by its path, you can run:
```shell script
steady publish-theme /path/to/theme.zip
```

*NOTE* None of the above commands will activate the uploaded theme.

### Get help
```shell script
steady --help
````

## Troubleshooting

`Error: Request failed with status code 404`

* Ensure that your site is up and running (common problem when running locally)
* Re-run the command with the verbose `-v` option and ensure all information is correct.

In particular, ensure that the API version is correct. The API version defaults to `v3`
so if you're still on `v2` that API won't yet exist and you'll get a 404 error.

You can specify the API version in the `.steadyrc` file like:
```json
{
    "version": "v2"
}
```


## Roadmap
`steady-cli` will gradually be expanded to handle other aspects of Ghost administration, specifically:

* Download/upload `routes.yaml`
* Download/upload `redirects.json`

Pull requests welcome.

---
This repository is maintained by [Ghoststead](https://www.ghoststead.com).
