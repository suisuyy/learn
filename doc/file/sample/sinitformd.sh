#!/bin/bash

sleep 2
/home/suisuy/kbmaindata/project/alist/alist server --data /home/suisuy/kbmaindata/project/alist/data &
/home/suisuy/kbmaindata/project/cloudreve/cloudreve  -c /mnt/psf/kbmaindata/project/cloudreve/conf.ini
