<?php

namespace App\Repository;

use App\Entity\ThemeSettings;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ThemeSettings|null find($id, $lockMode = null, $lockVersion = null)
 * @method ThemeSettings|null findOneBy(array $criteria, array $orderBy = null)
 * @method ThemeSettings[]    findAll()
 * @method ThemeSettings[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ThemeSettingsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ThemeSettings::class);
    }

    // /**
    //  * @return ThemeSettings[] Returns an array of ThemeSettings objects
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
    public function findOneBySomeField($value): ?ThemeSettings
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
