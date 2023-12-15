import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto, CreateTransactionObjDto, WebhookBodyDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository, getConnection } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { v4 as uuidv4 } from 'uuid';
import { TransactionType } from 'src/transaction_type/entities/transaction_type.entity';
import { TransactionStatus } from 'src/transaction_status/entities/transaction_status.entity';
import { NotFoundError } from 'rxjs';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { User } from 'src/user/entities/user.entity';
import { transactionStatus, transactionTypes } from 'src/auth/constant';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(TransactionType)
    private readonly typeRepository: Repository<TransactionType>,
    @InjectRepository(TransactionStatus)
    private readonly statusRepository: Repository<TransactionStatus>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async create(user, invoiceId, createTransactionDto: CreateTransactionDto) {
    try {
      const {to, from, amount} = createTransactionDto;
      const connection = getConnection();
      const [invoice_data, user_data, pending_status_data, completed_type_data] = await Promise.all([
        this.invoiceRepository.findOne({where: {id : invoiceId}}),
        this.userRepository.findOne({ where: {id : user?.id }, relations: ['wallet']}),
        this.statusRepository.findOne({where: {status : transactionStatus?.pending}}),
        this.typeRepository.findOne({where : {type: transactionTypes.completed}})
      ]);
      await connection.transaction(async (entityManager) => {
        if(user_data) {
          if(invoice_data) {
            const wallet_data = await entityManager.findOne(Wallet, {where: {user_uuid : user_data?.id}});
            if(wallet_data) {
              if(amount < wallet_data?.amount) {
                const transaction_obj: CreateTransactionObjDto = {
                  id : uuidv4(),
                  to: to,
                  from: from,
                  transactionId: to+from,
                  amount : amount,
                  transaction_type_uuid : pending_status_data?.id,
                  transaction_status_uuid: completed_type_data?.id
                };
                await entityManager.update(Invoice, {id : invoiceId}, {pendingAmount: invoice_data?.pendingAmount - amount});
                await entityManager.update(Wallet, {id : wallet_data?.id}, {amount : wallet_data?.amount - amount});
                await entityManager.save(Transaction, transaction_obj);
              } else {
                throw new Error("Please re-check your amount entered");
              }
            } else {
              throw new NotFoundException("Something's wrong with your wallet!");
            }
          } else {
            throw new NotFoundException("Invoice not found");
          }
        } else {
          throw new NotFoundException("User not found");
        }
      });
    } catch(err) {
      console.error("Error => ", err);
      throw new Error("Transaction Failed");
    }
    return {status : 200, message : `Transaction Successful`};
  }

  async webhook(user, body: WebhookBodyDto) {
    try {

      // 1.  Validate the incoming body data for notification of transaction
      // 2.  Initiate the sockets for the notification
      // 3.  Create obj of notifications
      // 4.  Save the Notifications generated
      // 5.  Broadcast the notification to user receiving the amount using socket
      
      console.log('Received payment of :', body?.amount);

      // 6.  Return a success response
      return {status : 200, message: "Notified to the receiver."};
    } catch (error) {
      // Handle errors or exceptions
      console.error('Error handling payment notification:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
