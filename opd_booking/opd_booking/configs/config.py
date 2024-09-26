from configparser import ConfigParser
import os


def config(filename="config.conf", section="postgresql"):
    parser = ConfigParser()
    parser.read(filename)
    data = {}
    if parser.has_section(section):
        params = parser[section].items()
        for param in params:
            data[param[0]] = param[1]
    else:
        raise Exception(f"Section {section} is not found in the {filename}")
    return data