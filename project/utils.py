
""" Utilities """

import os

from typing import List

def getTemplateDirs () -> List[str]:
    """
    Returns a list of paths to all template directories.
    """

    templateDirs = []

    baseDir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    for dir in os.listdir():
        if not os.path.isfile(dir):
            templateDirs.append(os.path.join(dir, 'templates'))

    return templateDirs
