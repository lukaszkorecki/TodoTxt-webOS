#!/usr/bin/env bash
cd ..
palm-install -r com.coffeesounds.todotxt
palm-package TodoTxt
palm-install com.coffeesounds.todotxt_0.0.1_all.ipk
palm-launch -i com.coffeesounds.todotxt
