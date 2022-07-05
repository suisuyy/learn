TARGET=suish

CC=gcc
#gcc -Wall enables all compiler's warning messages. This option should always be used, in order to generate better code.  -g enables debugging information. -std is the C99 standard. -O3 is the fastest option. -o is the output file. -c is the input file.
CFLAGS=-Wall -g  -std=c99

LINKER=gcc
#-I is the include directory. -lm is the math library.
LFLAGS=-Wall -I. -lm 

#source files directory,object files directory,binary file directory
SRCDIR=src
OBJDIR=obj
BINDIR=bin

#all source files and header
SOURCES=$(shell find $(SRCDIR) -name '*.c')
INCLUDE=$(shell find $(SRCDIR) -name '*.h')
#all object files,here is substitution,all .c files in SOURCES are substituted with .o
OBJECTS := $(SOURCES:$(SRCDIR)/%.c=$(OBJDIR)/%.o) 

$(BINDIR)/$(TARGET): $(OBJECTS)
	echo 26: OBJECTS:$(OBJECTS) SOURCES:$(SOURCES)   TARGET:$(TARGET) BINDIR:$(BINDIR) OBJDIR:$(OBJDIR) SRCDIR:$(SRCDIR)
	@mkdir -p $(BINDIR)
	$(LINKER) $(LFLAGS)  $(OBJECTS) -o $@
	@echo "Build $@ successfully!"

$(OBJECTS): $(OBJDIR)/%.o : $(SOURCES)
	mkdir -p $(dir $@)
	# @mkdir -p $(OBJDIR)
	$(CC) $(CFLAGS) -c $(SOURCES) -o $@

.PHONY : clean
clean:
	@rm -rf $(BINDIR) $(OBJDIR)
	@echo "Clean successfully!"
