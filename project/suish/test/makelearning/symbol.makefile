# test for many odd symbol
# @ add it before the shell command,then the command not printed when make
# $< first prerequisite
# $@

test: demo : a.c
	echo $@

all: a.c b.c
	echo   1:without@
	@echo  2:with@
	echo   3:$<
