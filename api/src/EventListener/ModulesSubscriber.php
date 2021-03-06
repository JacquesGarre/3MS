<?php

namespace App\EventListener;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Modules;
use App\Repository\ModulesRepository;
use App\Entity\ThemeSettings;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Doctrine\Common\EventSubscriber;
use Doctrine\DBAL\Schema\Schema;

use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\NullOutput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;

use App\Helpers\ModulesHelper;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class ModulesSubscriber implements EventSubscriber
{
    private $em;
    private $kernel;

    public function __construct(
        EntityManagerInterface $em, 
        KernelInterface $kernel, 
        ModulesRepository $repository
    )
    {      
        $this->em = $em;
        $this->kernel = $kernel;
        $this->repository = $repository;
    }

    public function getSubscribedEvents(): array
    {
        return [
            Events::postPersist,
            Events::postRemove,
            Events::postUpdate
        ];
    }

    // After creating a new module
    public function postPersist(LifecycleEventArgs $args): void
    {
        $module = $args->getObject();
        if ($module instanceof Modules) {

            // Create the entity
            $application = new Application($this->kernel);
            $application->setAutoExit(false);
            $input = new ArrayInput([
                'command' => 'make:entity',
                'name' => ModulesHelper::getEntityName($module->getSlug()),
                '--api-resource' => 'a'
            ]);
            $input->setInteractive(false);
            $output = new NullOutput();
            $application->run($input, $output);
            
            // Create the migration file
            $application = new Application($this->kernel);
            $application->setAutoExit(false);
            $input = new ArrayInput([
                'command' => 'doctrine:migration:diff'
            ]);
            $input->setInteractive(false);
            $output = new NullOutput();
            $application->run($input, $output);

        }
    }

    // After updating a module
    public function postUpdate(LifecycleEventArgs $args): void
    {
        $module = $args->getObject();
        $changes = $this->em->getUnitOfWork()->getEntityChangeSet($module);

        // Only if the slug changes
        if ($module instanceof Modules && array_key_exists('slug', $changes)) {

            $oldClassName = ModulesHelper::getEntityName($changes['slug'][0]);
            $newClassName = ModulesHelper::getEntityName($changes['slug'][1]);

            // Rename entity
            $srcDir = dirname(__FILE__, 2);
            rename($srcDir.'/Entity/'.$oldClassName.'.php', $srcDir.'/Entity/'.$newClassName.'.php');

            // Changing contents of entity class
            $classFile = $srcDir.'/Entity/'.$newClassName.'.php';
            $replace = [
                'use App\Repository\\'.$oldClassName.'Repository;'                 => 'use App\Repository\\'.$newClassName.'Repository;',
                '@ORM\Entity(repositoryClass='.$oldClassName.'Repository::class)'  => '@ORM\Entity(repositoryClass='.$newClassName.'Repository::class)',
                'class '.$oldClassName                                             => 'class '.$newClassName,
            ];
            file_put_contents(
                $classFile,
                str_replace(
                    array_keys($replace), 
                    $replace,
                    file_get_contents($classFile)
                )
            );

            // Rename repository
            rename($srcDir.'/Repository/'.$oldClassName.'Repository.php', $srcDir.'/Repository/'.$newClassName.'Repository.php');

            // Changing contents of repository
            $classFile = $srcDir.'/Repository/'.$newClassName.'Repository.php';
            $replace = [
                'use App\Entity\\'.$oldClassName.';' => 'use App\Entity\\'.$newClassName.';',
                '@method '.$oldClassName => '@method '.$newClassName,
                'class '.$oldClassName.'Repository' => 'class '.$newClassName.'Repository',
                $oldClassName.'::class' => $newClassName.'::class',
            ];
            file_put_contents(
                $classFile,
                str_replace(
                    array_keys($replace), 
                    $replace,
                    file_get_contents($classFile)
                )
            );

            // Create the migration file
            $application = new Application($this->kernel);
            $application->setAutoExit(false);
            $input = new ArrayInput([
                'command' => 'doctrine:migration:diff'
            ]);
            $input->setInteractive(false);
            $output = new NullOutput();
            $application->run($input, $output);

        }
    }

    // After removing a module
    public function postRemove(LifecycleEventArgs $args): void
    {   
        $module = $args->getObject();
        if ($module instanceof Modules) {

            // Remove entity in src/Entities and src/Repository
            $srcDir = dirname(__FILE__, 2);
            $entity = ModulesHelper::getEntityName($module->getSlug());
            unlink($srcDir.'/Entity/'.$entity.'.php');
            unlink($srcDir.'/Repository/'.$entity.'Repository.php');
            
            // Create the migration file
            $application = new Application($this->kernel);
            $application->setAutoExit(false);
            $input = new ArrayInput([
                'command' => 'doctrine:migration:diff'
            ]);
            $input->setInteractive(false);
            $output = new NullOutput();
            $application->run($input, $output);

        }
    }





}