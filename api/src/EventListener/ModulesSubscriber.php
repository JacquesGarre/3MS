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

use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\NullOutput;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;

define('STDIN',fopen("php://stdin","r"));

class ModulesSubscriber implements EventSubscriber
{
    private $em;
    private $kernel;

    public function __construct(EntityManagerInterface $em, KernelInterface $kernel, ModulesRepository $repository)
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
            Events::postUpdate,
        ];
    }

    private function getEntityName($slug): string
    {
        $entityName = '';
        if (strpos($slug, '-') === FALSE) {
            $entityName = ucfirst(strtolower($slug));
        } else {
            $words = explode('-', $slug);
            foreach ($words as $word) {
                $entityName .= ucfirst(strtolower($word));
            }
        }
        return $entityName;
    }

    // After adding a module
    public function postPersist(LifecycleEventArgs $args): void
    {
        $module = $args->getObject();
        if ($module instanceof Modules) {
            $entityName = $this->getEntityName($module->getSlug());
            $this->makeEntity($entityName);
        }
    }

    // After updating a module
    public function postUpdate(LifecycleEventArgs $args): void
    {
        $module = $args->getObject();
        $changes = $this->em->getUnitOfWork()->getEntityChangeSet($module);
        if ($module instanceof Modules && array_key_exists('slug', $changes)) {
            // Remove entity in src/Entities and src/Repository
            $srcDir = dirname(__FILE__, 2);
            $entity = $this->getEntityName($changes['slug'][0]);
            unlink($srcDir.'/Entity/'.$entity.'.php');
            unlink($srcDir.'/Repository/'.$entity.'Repository.php');

            // Create new entity
            $entityName = $this->getEntityName($module->getSlug());
            $this->makeEntity($entityName);
        }

    }

    // After removing a module
    public function postRemove(LifecycleEventArgs $args): void
    {   
        $module = $args->getObject();
        if ($module instanceof Modules) {
            // Remove entity in src/Entities and src/Repository
            $srcDir = dirname(__FILE__, 2);
            $entity = $this->getEntityName($module->getSlug());
            unlink($srcDir.'/Entity/'.$entity.'.php');
            unlink($srcDir.'/Repository/'.$entity.'Repository.php');
        }
    }

    // Equivalent of bin/console make:entity $name
    public function makeEntity($name)
    {
        $application = new Application($this->kernel);
        $application->setAutoExit(false);
        $input = new ArrayInput([
            'command' => 'make:entity',
            'name' => $name,
            '--api-resource' => 'a',
        ]);
        $output = new NullOutput();
        $application->run($input, $output);
        return new Response(""); 
    }


}