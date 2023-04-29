set -x



KERNEL_VERSION=`ls /lib/modules/ -1`
dracut --force --fstab --early-microcode --kmoddir /lib/modules/${KERNEL_VERSION} --kver=${KERNEL_VERSION}

