# github repo
curl https://api.github.com/users/suisuyy
curl https://api.github.com/users/suisuyy/followers

get a token by going to https://github.com/settings/tokens and clicking on Generate new token.
token=youtokenhere
 curl -H "Authorization: token ${token}" -d '{"name":"Github API Testing"}' https://api.github.com/user/repos



# end


