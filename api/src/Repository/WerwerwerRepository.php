<?php

namespace App\Repository;

use App\Entity\Werwerwer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Werwerwer|null find($id, $lockMode = null, $lockVersion = null)
 * @method Werwerwer|null findOneBy(array $criteria, array $orderBy = null)
 * @method Werwerwer[]    findAll()
 * @method Werwerwer[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WerwerwerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Werwerwer::class);
    }

    // /**
    //  * @return Werwerwer[] Returns an array of Werwerwer objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Werwerwer
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
