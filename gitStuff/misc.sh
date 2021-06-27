# current working branch
git branch

# new branch
git checkout -b [new_branch_name] [root_branch]

# log
git log

# status
git status

# add files
git add [path/file]
git add . # add all

# commit
git commit -m "commit messsage"
git commit -am "msg" # commit all files added

# push
git push -u [local] [remote] # update
git push -f [local] [remote] # force push

# pull (update local version)
git pull

# add remote origin 
git remote add origin [path]
# git remote add https://github.com/duckimann/tempaste
# git remote add C:/some/localGit

# fetch
git fetch [remote] [branch]
git fetch --all

# rebase
git rebase [branch]
git rebase [branch] -i # rebase interactively
# reword (r): apply commit & edit commit msg
# edit (e): apply commit but pause the rebase to fix the code
# squash (s): append current commit to the previous commit
# fixup (f): same with squash but remote commit msg
# exec (x): run shell command
# drop (d): drop commit

# Merge
git merge [merge_X_to_current_branch] # can't differentiate commits
git merge [merge_X_to_current_branch] --no-ff

# Reset
git reset
git reset --hard

# Revert
git revert