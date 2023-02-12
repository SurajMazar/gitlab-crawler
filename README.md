## Gitlab Crawler

Easy way to clone yout projects

### Installation

1.Clone the repo

2.On the project directory, run

  ~~~
    npm i . -g
  ~~~
  
3. The _glc command is avaliable globally.

4. Run , to show the config

~~~
   _glc config:show
~~~

5. Set the gitlab host
~~~
   _glc config:url  ${YOUR_GITLAB_DOMAIN}    
~~~

5. Set the gitlab personal access token
~~~
   _glc config:token  ${YOUR_GITLAB_PERSONAL_ACCESS_TOKEN}    
~~~

6.  run
~~~
   _glc import    
~~~

this commands shos the list of projects on your git lab account 

follow the instruction and press enter to clone all the selected repos.


### Flags

run 

~~~
   _glc import --search=${YOUR_SEARCH_KEYWORD}
~~~

to import the project related to the specific keyword of your choice
