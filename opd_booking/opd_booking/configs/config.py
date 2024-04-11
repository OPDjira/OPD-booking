from configparser import ConfigParser
import os


def config(filename="config.conf", section="postgresql"):
    parser = ConfigParser()
    parser.read(filename)
    print(parser.sections())
    data = {}
    if parser.has_section(section):
        params = parser[section].items()
        for param in params:
            data[param[0]] = param[1]
    else:
        print(os.listdir(os.getcwd()))
        raise Exception(f"Section {section} is not found in the {filename}")
    return data