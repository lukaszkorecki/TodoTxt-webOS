#!/usr/bin/env bash
cd ..
echo '>>> removing'
rm com.coffeesounds.todotxt_0.0.1_all.ipk
palm-install -r com.coffeesounds.todotxt
echo '>>> packaging'
palm-package TodoTxt
echo '>>> installing'
palm-install com.coffeesounds.todotxt_0.0.1_all.ipk
echo '>>> starting'
palm-launch -i com.coffeesounds.todotxt
