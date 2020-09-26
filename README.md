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

or one a per-project basis:
```shell script
npm install --save-dev steady-cli
```

## Setup (for site maintenance)
These step steps are only necessary for the site maintenance commands - e.g. `publish-theme`.
If you only want to develop an theme locally you can hold off performing this setup until you are ready to deploy.

### Create an integration in your site
* Go to the Integration Settings link in your Ghost site and click `Add custom integration`.
* Give the new integration any name you want e.g. Ghoststead and hit 'Create'.
* Note the 'Admin API Key' to be used later.


### Create a .env file for your project
Create file name `.env` in your project directory containing the following information.
```shell script
SITE_URL=<your site URL>
ADMIN_API_KEY=<admin API key>
```
where each line after the equals (=) sign is replaced with your information.
The site URL should contain the scheme - http or https - and should NOT end in a trailing slash (/).

*Why use a `.env` file instead of `.steadyrc`?*

Environment files are not checked into source control whereas rc files generally are.
The `.env` file contains credential information - e.g. `ADMIN_API_KEY` -
which should not be committed.  If you're using `git`, then your `.gitignore` file should specifically exclude `.env`.

__New in 1.4.0__: You can now create `.env` with a single command:
```
steady initenv
```
The above command will created a commented `.env` file that you can custimized.


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

If your theme name changes from the default `ghoststead`, you can add set the new theme name in the `.env` file via:

```
THEME=mytheme
```
where `mytheme` is replaces by the name of your theme.  Your theme should be located - for instance, checked out if using source control - in `content/themes`
along side the `ghoststead` and `caspar` themes.


### Upload a theme
From your work directory - containing a `.env` file configured as above -
upload a built theme via:
```shell script
steady publish-theme /path/to/theme.zip
```
This command will not activate a new theme, but will replace an already active theme.

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

You can specify the API version in the `.env` file like:
```shell script
API_VERSION=v2
```


## Roadmap
`steady-cli` will gradually be expanded to handle other aspects of Ghost administration, specifically:

* Download/upload `routes.yaml`
* Download/upload `redirects.json`

Pull requests welcome.

---
This repository is maintained by [Ghoststead](https://www.ghoststead.com).
