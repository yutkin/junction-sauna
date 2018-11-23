from setuptools import setup, find_packages

setup(
    name='aisauna',
    version="0.0.1",
    python_requires='>=3.7',
    packages=find_packages(),
    entry_points={
        'console_scripts': ['aisauna = aisauna.app:start_app'],
    },
    namespace_packages=['aisauna'],
)
