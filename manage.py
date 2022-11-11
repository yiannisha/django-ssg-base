#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from cookiecutter.main import cookiecutter

COOKIECUTTER_APP_TEMPLATE = 'https://github.com/yiannisha/django-ssg-app-template'

def createApp (appName: str) -> None:
    """
    Creates an app using the COOKIECUTTER_APP_TEMPLATE
    
    :param appName: name of the app
    """
    
    context = {
        'APP_NAME': appName,
    }

    cookiecutter(
        COOKIECUTTER_APP_TEMPLATE,
        no_input=True,
        extra_context=context
    )
    

def configureApp (appName: str) -> None:
    """
    Configures the project to work with the given app.
    Assumes that it is an app based on the COOKIECUTTER_APP_TEMPLATE.

    :param appName: name of the app
    """
    pass

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    if sys.argv[1] == 'startapp':
        createApp(sys.argv[2])
        sys.exit(0)
    main()
