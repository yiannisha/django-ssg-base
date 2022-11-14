#!/usr/bin/env python3

""" Utilities """

import os

from typing import List

def getAppNames () -> List[str]:
    """
    Returs a list of the names of all the local apps.
    Filters through directories by checking if they
    have a 'templates' subfolder.
    """
    appNames = []

    baseDir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    for dir in os.listdir(baseDir):
        newPath = os.path.join(baseDir, dir)
        if not os.path.isfile(newPath):
            if 'templates' in os.listdir(newPath):
                appNames.append(dir)
        else:
            continue

    return appNames

def getTemplateDirs () -> List[str]:
    """
    Returns a list of paths to all template directories.
    """

    templateDirs = [
        os.path.join(app, 'templates') for app in getAppNames()
    ]

    print(templateDirs)
    return templateDirs

# if __name__ == '__main__':
#     print(getTemplateDirs())