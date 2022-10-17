# github repo
curl https://api.github.com/users/suisuyy
curl https://api.github.com/users/suisuyy/followers

get a token by going to https://github.com/settings/tokens and clicking on Generate new token.
token=youtokenhere
testfilePath="https://api.github.com/repos/suisuyy/Github-API-Testing/contents/anewfile"

 curl -H "Authorization: token ${token}" -d '{"name":"Github API Testing"}' https://api.github.com/user/repos

#update
curl \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${token}" \
  https://api.github.com/repos/suisuyy/Github-API-Testing/contents/anewfile \
  -d '{"message":"my commit message","committer":{"name":"Monalisa Octocat","email":"octocat@github.com"},"content":"needbase64fromcurlbXkgbmV3IGZpbGUgY29udGVudHM="}'

#get  result is base64 code
curl \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${token}" \
  ${testfilePath}

#delete
curl \
  -X DELETE \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  https://api.github.com/repos/OWNER/REPO/contents/PATH \
  -d '{"message":"my commit message","committer":{"name":"Monalisa Octocat","email":"octocat@github.com"},"sha":"329688480d39049927147c162b9d2deaf885005f"}'




# end


