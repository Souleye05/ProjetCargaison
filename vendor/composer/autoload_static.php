<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInita3fef5e36e1f13354a95b0b4bdee592a
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInita3fef5e36e1f13354a95b0b4bdee592a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInita3fef5e36e1f13354a95b0b4bdee592a::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInita3fef5e36e1f13354a95b0b4bdee592a::$classMap;

        }, null, ClassLoader::class);
    }
}