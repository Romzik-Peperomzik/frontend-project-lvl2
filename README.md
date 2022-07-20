### Hexlet tests and linter status:
[![hexlet-check](https://github.com/Romzik-Peperomzik/frontend-project-lvl2/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Romzik-Peperomzik/frontend-project-lvl2/actions/workflows/hexlet-check.yml)
[![linter-check](https://github.com/Romzik-Peperomzik/frontend-project-lvl2/actions/workflows/linter-check.yml/badge.svg)](https://github.com/Romzik-Peperomzik/frontend-project-lvl2/actions/workflows/linter-check.yml)
<a href="https://codeclimate.com/github/Romzik-Peperomzik/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/55f4130ef8ae96ee734f/maintainability" /></a>
<a href="https://codeclimate.com/github/Romzik-Peperomzik/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/55f4130ef8ae96ee734f/test_coverage" /></a>
# **gendiff cli utility**

## Description:
```
Generate difference between two json/yaml files in different output formats.
```
## Setup:
```
make install
```
## How to use:
```sh
$ gendiff file1.json file2.json

$ gendiff -h
gendiff [options] <pathToFile1> <pathToFile2>

Options:
-V, --version output the version number
-f, --format [type] Output format
-h, --help output usage information

[type] - plain, json, nested
<pathToFile> - path to json, yaml or ini configuration file
```
## Functionality:
<details>
<summary><h4>Stylish format:</h4></summary>
  <a href="https://asciinema.org/a/LhAL0FtkQ5iJit7tdH9xqvyNp" target="_blank"><img src="https://asciinema.org/a/LhAL0FtkQ5iJit7tdH9xqvyNp.svg" /></a>
</details>

<details>
<summary><h4>Plain format:</h4></summary>
  <a href="https://asciinema.org/a/2DeKuSINmbIip2SciI07TgpJk" target="_blank"><img src="https://asciinema.org/a/2DeKuSINmbIip2SciI07TgpJk.svg" /></a>
</details>

<details>
<summary><h4>JSON format:</h4></summary>
  <a href="https://asciinema.org/a/3NHtBlJWmbpXls8Gwjffsmxb4" target="_blank"><img src="https://asciinema.org/a/3NHtBlJWmbpXls8Gwjffsmxb4.svg" /></a>
</details>