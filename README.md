# CLI for programmatically updating Ghost sites

`steady-cli` allows you to maintain your Ghost site programmatically without
having to go back and forth to the Admin UI.  The `steady-cli` command can easily be integrated into an existing build process.

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

## Setup

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

## Usage

### Upload a theme
From your theme directory - containing a `.env` file configured as above -
upload a built theme via:
```shell script
steady-cli publish-theme /path/to/theme.zip
```
This command will not activate the theme, but will replace an already active theme.

### Get help
```shell script
steady-cli --help
````

## Troubleshooting

`Error: Request failed with status code 404`

* Ensure that your site is up and running (common problem when running locally)
* Re-run the command with the verbose `-v` option and ensure all information is correct.

A common error is that the API doesn't match.  The API version defaults to `v3`
so if you're still on `v2` that API won't exist, hence the 404 error.

You can specify the API version to use in the `.env` file like:
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
