#!/bin/bash
# Remove installed dependencies and build artifacts for a clean slate.
set -e

rm -rf node_modules
rm -rf .next
rm -rf out
rm -rf build
