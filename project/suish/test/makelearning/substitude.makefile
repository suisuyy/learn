#for learning make feature,use make -f ./substitude.makefile to execute

#substitute
foo := a.o b.o l.a c.o
one := $(patsubst %.o,%.c,$(foo)) #one two three will all be :a.c b.c l.a c.c
# This is a shorthand for the above
two := $(foo:%.o=%.c)
# This is the suffix-only shorthand, and is also equivalent to the above.
three := $(foo:.o=.c)

all:
	echo $(one)
	echo $(two)
	echo $(three)


#output
#a.c b.c l.a c.c
#a.c b.c l.a c.c
#a.c b.c l.a c.c
