<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\HttpFoundation\Request;


class OperationsController extends AbstractController
{   

    private $em;
    private $kernel;

    public function __construct(EntityManagerInterface $em, KernelInterface $kernel)
    {      
        $this->em = $em;
        $this->kernel = $kernel;
    }

    /**
     * @Route("/api/operations/migrate", methods={"GET"})
     * 
     */
    public function migrate(Request $request): Response
    {   

        $token = $request->query->get('token');

        // Runs the migration
        $application = new Application($this->kernel);
        $application->setAutoExit(false);
        $input = new ArrayInput([
            'command' => 'doctrine:migration:migrate'
        ]);
        $input->setInteractive(false);
        $output = new BufferedOutput();
        $application->run($input, $output);
        return new Response($output->fetch());

    }
}