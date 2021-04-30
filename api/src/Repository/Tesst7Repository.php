<?php

namespace App\Repository;

use App\Entity\Tesst7;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Tesst7|null find($id, $lockMode = null, $lockVersion = null)
 * @method Tesst7|null findOneBy(array $criteria, array $orderBy = null)
 * @method Tesst7[]    findAll()
 * @method Tesst7[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class Tesst7Repository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tesst7::class);
    }

    // /**
    //  * @return Tesst7[] Returns an array of Tesst7 objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Tesst7
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
