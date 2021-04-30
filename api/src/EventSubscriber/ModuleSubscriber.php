<?php
// api/src/EventSubscriber/ModuleSubscriber.php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Modules;
use App\Entity\ThemeSettings;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\NullOutput;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;

final class ModuleSubscriber implements EventSubscriberInterface
{
    private $em;
    private $kernel;

    public function __construct(EntityManagerInterface $em, KernelInterface $kernel)
    {
        $this->em = $em;
        $this->kernel = $kernel;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['hook', EventPriorities::POST_WRITE],
        ];
    }

    public function hook(ViewEvent $event): void
    {

        $module = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        $entity = $event->getRequest()->attributes->get('_api_resource_class');
        $id = $event->getRequest()->attributes->get('id');

        // If a module is inserted
        if ($module instanceof Modules && Request::METHOD_POST == $method) {
            
            $entityName = ucfirst($module->getSlug());
            $this->makeEntity($entityName);
        
        // If a module is updated
        } else if ($module instanceof Modules && Request::METHOD_PUT == $method) {
            
            // php bin/console make:entity

        // If a module is deleted
        } else if ($entity == 'App\Entity\Modules' && Request::METHOD_DELETE == $method) {
            $setting = new ThemeSettings();
            $setting->setName('SUPPRESSION DE MODULE!');
            $setting->setValue($id);
            $this->em->persist($setting);
            $this->em->flush();
        }
    }

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