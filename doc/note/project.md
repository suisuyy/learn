# github repo
curl https://api.github.com/users/suisuyy
curl https://api.github.com/users/suisuyy/followers

get a token by going to https://github.com/settings/tokens and clicking on Generate new token.
token=youtokenhere
 curl -H "Authorization: token ${token}" -d '{"name":"Github API Testing"}' https://api.github.com/user/repos

#update
curl \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${token}" \
  https://api.github.com/repos/suisuyy/Github-API-Testing/contents/anewfile \
  -d '{"message":"my commit message","committer":{"name":"Monalisa Octocat","email":"octocat@github.com"},"content":"needbase64fromcurlbXkgbmV3IGZpbGUgY29udGVudHM="}'

#get
curl \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  https://api.github.com/repos/OWNER/REPO/contents/PATH





# end


