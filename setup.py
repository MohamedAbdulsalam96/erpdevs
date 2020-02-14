# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in erpdevs/__init__.py
from erpdevs import __version__ as version

setup(
	name='erpdevs',
	version=version,
	description='Developments',
	author='One FM',
	author_email='sahil19893@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
