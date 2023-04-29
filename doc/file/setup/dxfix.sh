set -x

echo add_drivers+="ahci megaraid_sas mpt3sas mpt2sas aacraid" 

KERNEL_VERSION=`ls /lib/modules/ -1`
dracut --force --fstab --early-microcode --kmoddir /lib/modules/${KERNEL_VERSION} --kver=${KERNEL_VERSION}

